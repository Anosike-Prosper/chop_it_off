import { userModel } from "../models/user.model";

const getaUser = async (object: string) => {
  return userModel.findOne({object});
};

const createUser = async (object:object) => {
  return userModel.create(object);
};

export  { createUser, getaUser };
