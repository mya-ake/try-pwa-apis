import logger from './logger';
import {
  getFilePathnames,
  readFile,
  extractExtension,
  extractFileName,
  CONTENT_TYPES,
} from './file';
import { S3 } from './s3';
import { CloudFront } from './cloud-front';

const validateEnvironmentVariables = (envNames = []) => {
  const insufficientEnvNames = envNames.filter(
    envName => !(envName in process.env),
  );
  if (insufficientEnvNames.length === 0) {
    return;
  }
  insufficientEnvNames.forEach(envName => {
    logger.error(`Require '${envName}' environment variable.`);
  });
  process.exit(1);
};

const selectCacheControl = fileName => {
  switch (fileName) {
    default:
      return 'max-age=86400';
  }
};

const buildUploadFileMeta = (rootdir, pathnames) => {
  return pathnames.reduce((metas, pathname) => {
    const fileName = extractFileName(pathname);
    const extension = extractExtension(pathname);
    const contentType =
      extension in CONTENT_TYPES
        ? CONTENT_TYPES[extension]
        : CONTENT_TYPES['plane'];
    metas.push({
      fileName,
      abosolutePathname: pathname,
      relativePathname: pathname.replace(`${rootdir}/`, ''),
      contentType,
    });
    return metas;
  }, []);
};

const uploadS3 = async ({ s3, metas }) => {
  for (const meta of metas) {
    const body = readFile(meta.abosolutePathname);
    const cacheControl = selectCacheControl(meta.fileName);

    logger
      .name('s3')
      .info(`Upload start: ${meta.relativePathname} - ${meta.contentType}`);
    const reulst = await s3
      .put({
        body,
        pathname: meta.relativePathname,
        options: {
          ContentType: meta.contentType,
          CacheControl: cacheControl,
        },
      })
      .then(() => {
        logger.name('s3').info(`Upload success: ${meta.relativePathname}`);
        return true;
      })
      .catch(err => {
        logger.name('s3').error(`Upload failed: ${meta.relativePathname}`, err);
        return false;
      });
    if (reulst === false) {
      process.exit(1);
    }
  }
};

const deleteS3Objects = async ({ s3, pathnames }) => {
  logger.name('s3').info(`Delete start:`, pathnames);
  const result = await s3
    .delete({ pathnames })
    .then(() => {
      logger.name('s3').info(`Delete success`);
      return true;
    })
    .catch(err => {
      logger.name('s3').error(`Delete failed`, err);
      return false;
    });
  if (result === false) {
    process.exit(1);
  }
};

const purgeCDN = async ({ cf, id }) => {
  logger.name('cf').info('Purge CDN start');

  const result = await cf
    .purge({ id })
    .then(() => {
      logger.name('cf').info('Purge CDN success');
      return true;
    })
    .catch(err => {
      logger.name('cf').error('Purge CDN failed', err);
      return false;
    });

  if (result === false) {
    process.exit(1);
  }
};

const extractDifference = (basePathnames, targetPathnames) => {
  return targetPathnames.filter(
    targetPathname => !basePathnames.includes(targetPathname),
  );
};

export const deploy = async dirPathname => {
  validateEnvironmentVariables(['BUCKET_NAME', 'CF_ID']);

  logger.name('deploy').info('Deploy start');

  const s3 = new S3().setParam('Bucket', process.env.BUCKET_NAME);
  const cf = new CloudFront();

  const targetFilenames = getFilePathnames(dirPathname);
  const targetFileMetas = buildUploadFileMeta(dirPathname, targetFilenames);

  const s3Pathnames = await s3.list();

  // Upload
  await uploadS3({ s3, metas: targetFileMetas });

  // CDN purge
  await purgeCDN({ cf, id: process.env.CF_ID });

  // Delete
  const relativePathnames = targetFileMetas.map(meta => meta.relativePathname);
  const deletePathnames = extractDifference(relativePathnames, s3Pathnames);
  if (deletePathnames.length > 0) {
    await deleteS3Objects({ s3, pathnames: deletePathnames });
  }

  logger.name('deploy').info('Deploy end');
};
