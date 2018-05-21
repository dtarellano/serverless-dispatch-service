const AWS = require('aws-sdk');
const sqs = new AWS.SQS({
  region: process.env.REGION || 'us-west-1',
  apiVersion: '2012-11-05',
  credentials: new AWS.Credentials({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })
});

module.exports.sqs = sqs;
