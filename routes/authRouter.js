import express from 'express';
import {
  authCurrentUser,
  authLogin,
  authLogout,
  authRegistretion,
  authUpdateSubscription,
  authUpdateUserAvatar,
  verifyEmail,
  resendVerifyEmail
} from '../controllers/authControllers.js';

import isEmptyBody from '../middelwarws/isEmptyBody.js';
import authenticate from '../middelwarws/authenticate.js';
import upload from '../middelwarws/upload.js';

const authRouter = express.Router();

authRouter.patch ('/', isEmptyBody,authenticate, authUpdateSubscription);

authRouter.post ('/register', isEmptyBody, authRegistretion);

authRouter.post ('/login', isEmptyBody, authLogin);

authRouter.post ('/logout',authenticate, authLogout);

authRouter.post('/current', authenticate, authCurrentUser);

authRouter.patch('/avatars', upload.single('avatar'), authenticate, authUpdateUserAvatar);
// apload.array('poster',3-quontityFiles)
// apload.fields([{name:'avatar', maxCount:1},{name:'info', maxCount:2}])

authRouter.get('/verify/:verificationToken', verifyEmail);

authRouter.post('/verify',isEmptyBody,  resendVerifyEmail);


export default authRouter;
