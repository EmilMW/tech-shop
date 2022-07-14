// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

const middleware = createProxyMiddleware({ target: "http://localhost:3001" });

const routes = ["/auth", "/products", "/carts"];

module.exports = function (app) {
  for (const route of routes) {
    app.use(route, middleware);
  }
};
