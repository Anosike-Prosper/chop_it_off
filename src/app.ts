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

import path from "path";


export const app = express();
require('./middlewares/auth')

app.use(express.json());
app.use(express.static(path.join(__dirname,'FRONTEND/provider/')))

app.use(cors())

app.use(passport.initialize());


if(process.env.NODE_ENV !=='test'){

  app.use(limiter)
}



connectToMongoDB();
cache();


// app.use();
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);



app.use('*', unknownEndpoint)
app.use(globalError)



