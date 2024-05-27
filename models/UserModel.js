import {Schema, model} from 'mongoose';
import {emailRegular} from '../constants/constants.js';
import {saveContactErrorHook, updateSittingsHook} from './hooks.js';

const userShema = Schema ({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegular,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: false,
  },
});

userShema.post ('save', saveContactErrorHook);

const UserModel = model ('users', userShema);
export default UserModel;
