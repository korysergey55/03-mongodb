import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const findUser = async email => UserModel.findOne (email);

export const createUser = async data => {
  const salt = await bcrypt.genSalt (10);
  const hashPassword = await bcrypt.hash (data.password, salt);
  const userData = await UserModel.create ({...data, password: hashPassword});
  return userData;
};

export const userLogout = async () => {};

export const userCurrent = async () => {};
