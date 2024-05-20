import * as authServices from '../services/authServices.js';
import {
  userRegistrationSchema,
  userLoginSchema,
} from '../schemas/contactsSchemas.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import { createToken,verifyToken } from '../helpers/jwtToken.js';

export const authRegistretion = async (req, res, next) => {
  try {
    const {error} = userRegistrationSchema.validate (req.body);
    if (error) {
      throw HttpError (400, error.message);
    }

    const {email} = req.body;
    const isUserExist = await authServices.findUser ({email});
    if (isUserExist) {
      throw HttpError (409, 'Email in use');
    }

    const newUser = await authServices.createUser(req.body);
    console.log(newUser)
    res.status (201).json ({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next (error);
  }
};

export const authLogin = async (req, res, next) => {
  try {
    const {error} = userLoginSchema.validate (req.body);
    if (error) {
      throw HttpError (400, error.message);
    }

    const {email, password} = req.body;
    const isUserExist = await authServices.findUser ({email});
    if (!isUserExist) {
      throw HttpError (401, 'Email or password is wrong');
    }

    const comparePassword = await bcrypt.compare (
      password,
      isUserExist.password
    );
    if (!comparePassword) {
      throw HttpError (401, 'Email or password is wrong');
    }
    const payload = {
      id:isUserExist._id
    }
    const token = createToken(payload)
    const isVerify = verifyToken(token)
    
    res.json ({
      token: token,
      user: {
        email: isUserExist.email,
        subscription: isUserExist.subscription,
      },
    });
  } catch (error) {
    next (error);
  }
};

export const authLogout = async (req, res, next) => {
  try {
    // const result = await authServices.userLogout ();
    res.json ('authLogout');
  } catch (error) {
    next (error);
  }
};

export const authCurrentUser = async (req, res, next) => {
  try {
    // const result = await authServices.userCurrent ();
    res.json ('authCurrentUser');
  } catch (error) {
    next (error);
  }
};
