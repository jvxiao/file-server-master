const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const multer = require('multer');
const fileupload = require('./utils/fileuploader'); 

const { getFileList, downloadFile } = require('./services/fileService');
const { getServerHostAndPort } = require('./services/systemService')

const app =  express((req, res) => {
  console.log(req.url);
});
console.log(path.join(__dirname, '../../web/dist/'));
app.use(cors());
app.use(bodyparser());
app.use('/', express.static(path.resolve(__dirname, '../../web/dist/')));
app.use((req, res, next) => {
  console.log(req.url);
  next();
})
app.post('/api/upload', fileupload, (req, res) => {
  // console.log(req.files);
  res.json({
    code: 0,
    data: 'ok'
  })
});
app.get('/api/getFileList', getFileList);
app.get('/api/downloadFile', downloadFile);
app.get('/api/gethostandport', getServerHostAndPort)
app.listen(process.env.PORT, '0.0.0.0');
console.log(`app is listening http://localhost:${process.env.PORT}`)