const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});

module.exports = s3;




// require('dotenv').config()
// const fs = require('fs')
// const S3 = require('aws-sdk/clients/s3')

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccessKey = process.env.AWS_SECRET_KEY;

// const s3 = new S3({
//   region,
//   accessKeyId,
//   secretAccessKey
// })


// // Uploads a file to s3
// export function upload(file) {
//   const fileStream = fs.createReadStream(file.path)

//   const uploadParams = {
//     Bucket, bucketName,
//     Body: fileStream,
//     key: file.filename
//   }

//   return s3.upload(uploadParams).promise()
// }
// exports.uploadFile = uploadFile


// Downloads a file from s3



//////////////////////////////////////////////////////////////

// import AWS from 'aws-sdk';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '.env') });

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: 'eu-west-2' // replace with your bucket's region
// });

// const s3 = new AWS.S3();

// export const uploadImageToS3 = (image) => {
//   const uploadParams = {
//     Bucket: 'fightr', // replace with your bucket name
//     Key: `${Date.now()}.jpg`, // replace with your unique image name logic
//     Body: image, // replace with the actual image data
//     ContentType: 'image/jpeg',
//     ACL: 'public-read' // so the image is publicly accessible
//   };

//   return new Promise((resolve, reject) => {
//     s3.upload(uploadParams, function(err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.Location);
//       }
//     });
//   });
// };
