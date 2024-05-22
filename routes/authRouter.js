import express from 'express';
import {
  authCurrentUser,
  authLogin,
  authLogout,
  authRegistretion,
  authUpdateSubscription
} from '../controllers/authControllers.js';
import isEmptyBody from '../middelwarws/isEmptyBody.js';
import authenticate from '../middelwarws/authenticate.js';

const authRouter = express.Router();

authRouter.patch ('/', isEmptyBody,authenticate, authUpdateSubscription);

authRouter.post ('/register', isEmptyBody, authRegistretion);

authRouter.post ('/login', isEmptyBody, authLogin);

authRouter.post ('/logout',authenticate, authLogout);

authRouter.get ('/current', authenticate, authCurrentUser);

export default authRouter;
