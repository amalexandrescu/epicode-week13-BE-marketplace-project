import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./api/products/index.js";
import filesRouter from "./api/files/index.js";
import {
  badRequestHandler,
  unauthorisedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorhandlers.js";

const server = express();

const port = 3001;

//put global middlewares here

server.use(express.json());

//put express routers here
server.use("/products", productsRouter);
server.use("/product", filesRouter);

//put error middlewares handlers here

server.use(badRequestHandler); // 400
server.use(unauthorisedHandler); // 401
server.use(notFoundHandler); // 404
server.use(genericErrorHandler); // 500

server.listen(port, () => {
  console.log("server runs on port: ", port);
  console.table(listEndpoints(server));
});
