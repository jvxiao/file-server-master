export const requestFilter = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log(req.headers);
      // 自定义请求处理...
      next();
    })
  },
})