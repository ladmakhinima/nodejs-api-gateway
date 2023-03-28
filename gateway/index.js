const express = require("express");
const httpProxy = require("http-proxy-middleware");

const routers = [
  {
    base: "/api/user",
    target: "http://localhost:4000",
  },
  {
    base: "/api/transactions",
    target: "http://localhost:7000",
  },
  {
    base: "/api/products",
    target: "http://localhost:5000",
  },
  {
    base: "/api/orders",
    target: "http://localhost:6000",
  },
];

const app = express();
routers.forEach((route) =>
  app.use(
    route.base,
    httpProxy.createProxyMiddleware({
      changeOrigin: true,
      target: route.target,
      logProvider: function () {
        return require("winston");
      },
    })
  )
);

app.listen(8585, () => {
  console.log("http://localhost:8585");
});
