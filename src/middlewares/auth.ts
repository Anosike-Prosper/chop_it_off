import { Request, Response, NextFunction, RequestHandler } from "express";
import passport from "passport";
import { userModel } from "../models/user.model";
import config from "../config/config";
import { Strategy, ExtractJwt, VerifiedCallback, } from 'passport-jwt';





const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:config.SECRET, // Replace with your secret key
};


passport.use(new Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userModel.findById(payload.id); // Replace with your user retrieval logic
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}))

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err) {
    
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.user = user;
    next();
  })(req, res, next);
}

