const multer = require("multer");
const multer_s3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();
const { accessKeyId, secretAccessKey } = process.env;
const s3 = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const imageupload = multer({
  storage: multer_s3({
    s3: s3,
    bucket: "won98",
    contentType: multer_s3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = imageupload;
