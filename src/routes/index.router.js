const router=require('express').Router()
const path=require('path')
const multer=require('multer')
const uuid=require('uuid/v4')

const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: "LtXk4m5dQCHHFUXEbPHMbHVz5GMjeiukjoZKkQrC",
    accessKeyId: "AKIAJUF4RJMCK7QUH75Q",
    region: 'us-east-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
  }

const upload = multer({
    fileFilter,
    storage: multerS3({
      s3: s3,
      bucket: 'ingleonelrv-image-test',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
          console.log(file.originalname.toLowerCase())
        cb(null, Date.now().toString()+'_'+file.originalname.toLowerCase())
      }
    })
  })
  
//   module.exports = upload;

router.get('/',(req,res)=>{
    res.render('index.ejs')
})

const singleUpload = upload.single('image')

router.post('/upload', function(req, res) {
    singleUpload(req, res, function(err, some) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      }
  
      return res.json({'imageUrl': req.file.location});
    });
  })
  
  module.exports = router;