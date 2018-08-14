import AWS from 'aws-sdk';

export class S3 {
  constructor(params = {}) {
    this._s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      region: 'ap-northeast-1',
      ...params,
    });

    this._params = {};
    return this;
  }

  setParam(key, value) {
    this._params[key] = value;
    return this;
  }

  put({ body, pathname, options = {} } = {}) {
    return new Promise((resolve, reject) => {
      this._s3.putObject(
        {
          ...this._params,
          Body: body,
          Key: pathname,
          ACL: 'public-read',
          ...options,
        },
        (err, data) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  list({ options = {} } = {}) {
    return new Promise((resolve, reject) => {
      this._s3.listObjectsV2(
        {
          ...this._params,
          ...options,
        },
        (err, data) => {
          if (err) {
            reject(new Error(err));
            return;
          }
          const keys = data.Contents.map(content => content.Key);
          resolve(keys);
        },
      );
    });
  }

  delete({ pathnames = [], options = {} } = {}) {
    const objects = pathnames.map(pathname => {
      return { Key: pathname };
    });
    return new Promise((resolve, reject) => {
      this._s3.deleteObjects(
        {
          ...this._params,
          Delete: {
            Objects: objects,
          },
          ...options,
        },
        (err, data) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(data);
          }
        },
      );
    });
  }
}
