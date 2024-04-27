const { default:axios } = require('axios');
const fs = require('fs');
const path = require('path');

const getFileList = async (req, res) => {
  const url = "http://localhost:3000/files";
  const resp = await axios.get(url);
  console.log(resp.data);
  res.json(resp.data);
}

const downloadFile = async (req, res) => {
  const url = "http://localhost:3000/files";
  console.log(req.url, '123123')
  console.log(req.query)
  const { fid } = req.query;
  console.log(`${url}?fid=${fid}`);
  const resp =  await axios.get(`${url}?fid=${fid}`);
  if(!resp.data || !resp.data.length ) {
    res.json({code: 1, msgEn: 'file does not exist'});
    return;
  }
  const target = resp.data[0];
  console.log(fs.existsSync(target.path));
  if(fs.existsSync(target.path)) {
    const readStream = fs.createReadStream(target.path);
    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(target.originalname))
    readStream.pipe(res);
    return;
  }
  res.json({code: 1, msgEn: 'file download failed'});
}

module.exports.getFileList = getFileList;
module.exports.downloadFile = downloadFile;