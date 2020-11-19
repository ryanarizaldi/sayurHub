const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/rajaongkir/*",
    createProxyMiddleware({
      target: "https://api.rajaongkir.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/rajaongkir": "/",
      },
    })
  );
};
