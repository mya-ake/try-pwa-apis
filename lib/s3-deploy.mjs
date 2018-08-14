import logger from './logger';
import {
  getFilePathnames,
  readFile,
  extractExtension,
  extractFileName,
  CONTENT_TYPES,
} from './file';
import { S3 } from './s3';

const selectCacheControl = fileName => {
  switch (fileName) {
    case 'sw.js':
      return 'no-store, no-cache, max-age=0';
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

    logger.name('s3').info(`Upload start: ${meta.relativePathname}`);
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

export const deploy = async dirPathname => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  if (!BUCKET_NAME) {
    logger.error('Require `BUCKET_NAME` environment variable.');
    process.exit(1);
  }

  const s3 = new S3().setParam('Bucket', BUCKET_NAME);

  const targetFilenames = getFilePathnames(dirPathname);
  const targetFileMetas = buildUploadFileMeta(dirPathname, targetFilenames);

  await uploadS3({ s3, metas: targetFileMetas });
};
