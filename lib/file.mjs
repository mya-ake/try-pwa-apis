import fs from 'fs';
import path from 'path';

export const CONTENT_TYPES = Object.freeze({
  html: 'text/html; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  map: 'application/octet-stream; charset=utf-8',
  json: 'application/json; charset=utf-8',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  xml: 'application/xml; charset=utf-8',
  woff: 'application/font-woff',
  plane: 'text/plain; charset=utf-8',
});

export const getFilePathnames = folderPath => {
  const paths = fs.readdirSync(folderPath);
  return paths.reduce((newPaths, filePath) => {
    const absoluteFilePath = path.join(folderPath, filePath);
    if (fs.statSync(absoluteFilePath).isDirectory()) {
      return newPaths.concat(getFilePathnames(absoluteFilePath));
    } else {
      return newPaths.concat(absoluteFilePath);
    }
  }, []);
};

export const readFile = pathname => {
  return fs.readFileSync(pathname, { encoding: 'utf8' });
};

export const extractExtension = filePath => {
  return filePath.replace(/.*\.([a-z]+)$/, '$1');
};

export const extractFileName = pathname => {
  return pathname.split('/').pop();
};
