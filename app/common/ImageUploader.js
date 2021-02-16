const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.SecretAccessKey,
  accessKeyId: process.env.AccessKeyId,
  region: process.env.Region
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb({
      message: "Invalid image type, only JPEG, JPG, PNG, is allowed.",
      code: 201
    },false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.Bucket,
    acl: process.env.ACL,
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;