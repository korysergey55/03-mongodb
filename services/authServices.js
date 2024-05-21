import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const findUser =  filter => UserModel.findOne (filter);

export const createUser = async data => {
  const salt = await bcrypt.genSalt (10);
  const hashPassword = await bcrypt.hash (data.password, salt);
  const userData = await UserModel.create ({...data, password: hashPassword});
  return userData;
};

export const updateUser = (filter,data)=> UserModel.findOneAndUpdate(filter,data)

export const userLogout = async () => {};

