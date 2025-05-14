require('dotenv').config();
const os = require('os');


const getServerHost = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.info('获取局域网 IP：', iface.address)
        return iface.address
      }
    }
  }
  console.warn('无法获取局域网 IP，使用默认 IP: 127.0.0.1')
  return '127.0.0.1'
}

module.exports = {
  getServerHost
}
