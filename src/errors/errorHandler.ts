require("dotenv").config();
// const CONFIG= require('../../config/config')
import { AppError } from "./appError";

import { Request, Response, NextFunction } from "express";

// let globalError:(err, req, res, next)

const prodValidationError = (err:any) => {
  return new AppError(err.message, 400);
};

const handleTypeError = (err:any) => {
  return new AppError(err.message, 400);
};

// /*Defined Error 1*/
const handleCastErrorDB = (err:any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err:any) => {
  const value = err.keyValue.title
    ? JSON.stringify(err.keyValue.title)
    : JSON.stringify(err.keyValue.email);
  const message = `Duplicate field value < ${value} >: Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err:any, req:Request, res:Response, next:NextFunction) => {
  
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status: status,
    message: err.message,
    error: err,
  });
};

const sendErrorProd = (err:any, req:Request, res:Response, next:NextFunction) => {
  
  /*Defined Errors*/
  if (err.name === "ValidationError") {
    err = prodValidationError(err);
  }
  if (err.name === "CastError") {
    err = handleCastErrorDB(err);
  }
  if (err.code === 11000) {
    err = handleDuplicateFieldsDb(err);
  }

  if (err.name === "TypeError") {
    err = handleTypeError(err);
  }

  /*Response Handler for defined errors*/
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Server Issues!",
    });
  }
};




// // module.exports =
module.exports= process.env.NODE_ENV === "development" ? sendErrorDev : sendErrorProd;

// // const global_error = process.env.NODE_ENV === "deve"
