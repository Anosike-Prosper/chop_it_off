import express, { NextFunction, Request, Response } from "express";
import { limiter } from "./middlewares/ratelimiter";
import { connectToMongoDB } from "./config/db";
import authRoutes from "./routes/auth.route";
import urlRoutes from "./routes/url.route";
import passport  from "passport";
import { unknownEndpoint } from "./middlewares/unknownEndpoint";
import cors from "cors"
import config from "./config/config";
const globalError = require('./errors/errorHandler')
import cache from "./config/cache";
require("dotenv").config();




import * as yaml from 'yaml';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./swagger.json";
import path from "path";


export const app = express();
require('./middlewares/auth')

app.use(express.json());
app.use(express.static(path.join(__dirname,'FRONTEND/provider/')))

app.use(cors())

app.use(passport.initialize());


if(process.env.NODE_ENV !=='test'){
  console.log(process.env.NODE_ENV)

  app.use(limiter)
}

// const options = {
//     definition: {
//       openapi: "3.1.0",
//       info: {
//         title: "LogRocket Express API with Swagger",
//         version: "0.1.0",
//         description:
//           "This is a simple CRUD API application made with Express and documented with Swagger",
//         license: {
//           name: "MIT",
//           url: "https://spdx.org/licenses/MIT.html",
//         },
//         contact: {
//           name: "LogRocket",
//           url: "https://logrocket.com",
//           email: "info@email.com",
//         },
//       },
//       servers: [
//         {
//           url: "http://localhost:4000",
//         },
//       ],
//     },
//     apis: ["./routes/*.ts"],
//   };
  
  // const specs = swaggerJSDoc(options);
  // app.use(
  //   "/api-docs",
  //   swaggerUi.serve,
  //   // swaggerUi.setup(specs)
  //   swaggerUi.setup(swaggerDocument, { explorer: true })
  // );

connectToMongoDB();
cache();


// app.use();
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);



app.use('*', unknownEndpoint)
app.use(globalError)



