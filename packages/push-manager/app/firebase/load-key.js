console.log('firebase load key');

const AWS = require('aws-sdk');
console.log('firebase load key, after aws sdk');
const KMS = new AWS.KMS({ apiVersion: '2014-11-01', region: 'ap-northeast-1' });
const fs = require('fs');

const decrypt = data => {
  return KMS.decrypt({
    CiphertextBlob: data,
  })
    .promise()
    .then(data => Buffer.from(data.Plaintext).toString())
    .then(dataString => JSON.parse(dataString));
};

const loadKey = keyPathname => {
  const keyData = fs.readFileSync(keyPathname);
  return decrypt(keyData);
};

module.exports = {
  loadKey,
};
