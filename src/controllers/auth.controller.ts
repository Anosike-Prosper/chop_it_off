
import { Error } from "mongoose";
import { userModel, IUser } from "../models/user.model";
import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/appError";
import { StatusCodes } from 'http-status-codes';
import { createUser } from "../services/user.services";
import { createToken } from "../utils/helper";









const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;

    const found = await userModel.findOne({ email });

    if (found) {
      throw new AppError(
        "user with this email already exist",
        StatusCodes.CONFLICT
      );
    }

    // const data = await userModel.create({ email, username, password });
    const data = await createUser({email, username, password })

    
 

    return res.status(StatusCodes.CREATED).json({
      message: "user has been successfully signed up",
      data,
    });
  } catch (err) {

    next(err);
  }
};

const login = async (req: Request , res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      
        throw new AppError(
          "Please provide email and password",
          StatusCodes.BAD_REQUEST
        );
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError(
          "Incorrect Email or Password",
          StatusCodes.UNAUTHORIZED
        );
    }


    const token = createToken(user.id);

    return res.status(200).json({
      message: "Login Successful",
      status: true,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export { login, signUp };
