require('dotenv').config();
const os = require('os');


const getServerHostAndPort = (req, res, next) => {
  let ip = '';
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.info('获取局域网 IP：', iface.address)
        ip = iface.address
      }
    }
  }
  res.json({
    code: 0,
    data: {
      ip,
      port: process.env.PORT 
    }
  })
}

module.exports.getServerHostAndPort = getServerHostAndPort

