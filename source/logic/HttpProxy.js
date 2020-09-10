import AWS from 'aws-sdk';
import uuid from 'react-native-uuid';
import axios from 'axios';

const getURL = 'https://manifold.picolabs.io:9090/sky/cloud/NDUTywTKJwDH5Y9wdgXUoo/io.picolabs.manifold.weather_pico/getCurrent';//'http://gutenberg.org/files/17/17.txt';
const BUCKET = '';
const IAM_ACCESS_KEY = '';
const IAM_ACCESS_SECRET = '';

export const receiveData = (callback) => {
    axios.get(getURL).then(callback);
}

export class s3 {
  constructor() {
    AWS.config.update({
      accessKeyId: IAM_ACCESS_KEY,
      secretAccessKey: IAM_ACCESS_SECRET,
      region: "us-west-2"
    });
  }

  uploadFile = (file, prefix, success, failure) => {
    let Key = (prefix) ? `${prefix}/${uuid.v4()}.txt` : `${uuid.v4()}.txt`;
    let upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: BUCKET,
          Key,
          Body: file
        }
      });

      let promise = upload.promise();
      promise.then(success, failure);
  }
}
