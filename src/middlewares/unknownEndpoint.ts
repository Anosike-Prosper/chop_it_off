import { StatusCodes } from "http-status-codes"
import { AppError } from "../errors/appError"
import { Request, Response,NextFunction } from "express"

const unknownEndpoint = (req:Request, res:Response) => {
    throw new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND)
}

export {unknownEndpoint}