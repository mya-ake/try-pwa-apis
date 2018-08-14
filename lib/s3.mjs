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
}
