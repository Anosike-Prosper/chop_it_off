
import jwt from "jsonwebtoken";
import config from "../config/config";

const createToken = (id: string) => {
    const token = jwt.sign({ id: id }, config.SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  
    return token;
  };


  export {createToken}