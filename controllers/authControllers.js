import * as authServices from '../services/authServices.js';
import {
  userRegistrationSchema,
  userLoginSchema,
  authUpdateSubscriptionSchema,
} from '../schemas/contactsSchemas.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import {createToken, verifyToken} from '../helpers/jwtToken.js';

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

    const newUser = await authServices.createUser (req.body);
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
      id: isUserExist._id,
    };
    const token = createToken (payload);
    await authServices.updateUser ({_id: isUserExist._id}, {token});

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
    const {_id} = req.user;
    await authServices.updateUser ({_id: _id}, {token: ''});
    res.status (204).json ({message: 'No Content'});
  } catch (error) {
    next (error);
  }
};

export const authCurrentUser = async (req, res, next) => {
  const {subscription, email} = req.user;
  res.json ({subscription, email});
};

export const authUpdateSubscription = async (req, res, next) => {
  try {
    const {error} = authUpdateSubscriptionSchema.validate (req.body);
    if (error) {
      throw HttpError (400, 'The body must have a subscription field');
    }
    const {_id} = req.user;
    const {subscription} = req.body;
    await authServices.updateUser({ _id: _id }, { subscription: subscription });
    
    res
      .status (201)
      .json({ message: `Subscription was updated to - ${subscription}` });
    
  } catch (error) {
    next (error);
  }
};
