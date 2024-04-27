const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const axiso = require('axios');
const { default: axios } = require('axios');

// files can upload once;
const LIMIT_COUNT = 20;
// field name
const KEY = 'file';

// set file storage place and define every file with a unique name incase duplication.
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, '../../storage'));
  },
  filename: (req, file, cb) => {
   const { originalname} = file;
   cb(null, `${Date.now()}.${originalname}`);
  },
})

// deal file name with Chines characters
const fileFilter = (req, file, callback) => {
  file.originalname = Buffer.from(file.originalname, "latin1").toString( "utf8");
  callback(null, true);
}

const uploader = multer({
  storage,
  fileFilter,
}).array(KEY, LIMIT_COUNT);


const recordLog = async (req) => {
  const url = "http://localhost:3000/files";
  const files = req.files;
  if(!files.length) return;
  files.forEach(item => {
    let log = {
      ...item,
      fid: crypto.randomUUID(),
      uploadTime: Date.now()
    }
    axios.post(url, log);
  })
}

// handle exceptions
module.exports =  (req, res, next) => {
  uploader(req, res, async (err) => {
    console.log('1111', req.files)
    if(err) {
      res.status(500).json({
        code: 1,
        msgCn: 'File upload failed.'
      })
    } else {
      await recordLog(req);
      next();
    }
  })
};