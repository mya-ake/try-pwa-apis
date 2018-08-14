import AWS from 'aws-sdk';

export class CloudFront {
  constructor(params = {}) {
    this._cf = new AWS.CloudFront({
      apiVersion: '2017-10-30',
      ...params,
    });
  }

  purge({ id } = {}) {
    return new Promise((resolve, reject) => {
      this._cf.createInvalidation(
        {
          DistributionId: id,
          InvalidationBatch: {
            CallerReference: String(new Date().getTime()),
            Paths: {
              Quantity: 1,
              Items: ['/'],
            },
          },
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
