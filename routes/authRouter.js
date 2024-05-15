import express from 'express';
import {
  authCurrentUser,
  authLogin,
  authLogout,
  authRegistretion,
} from '../controllers/authControllers.js';
import isEmptyBody from '../middelwarws/isEmptyBody.js';


const authRouter = express.Router ();

authRouter.post ('/register',isEmptyBody, authRegistretion);

authRouter.post ('/login',isEmptyBody, authLogin);

authRouter.post ('/logout', authLogout);

authRouter.post ('/current', authCurrentUser);

export default authRouter;
