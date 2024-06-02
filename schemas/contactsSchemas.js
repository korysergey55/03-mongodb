import Joi from 'joi';
import { emailRegular } from '../constants/constants.js';

export const createContactSchema = Joi.object({
  id: Joi.string (),
  name: Joi.string ().required (),
  email: Joi.string ().required (),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  id: Joi.string (),
  name: Joi.string (),
  email: Joi.string (),
  phone: Joi.string(),
  favorite:Joi.boolean()
}).min(1);

export const updateStatusSchema = Joi.object({
  favorite:Joi.boolean().required()
});

export const userRegistrationSchema = Joi.object({
  email: Joi.string().pattern(emailRegular).required(),
  password: Joi.string().min(7).required()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegular).required(),
  password: Joi.string().min(7).required()
});

export const authUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

export const authEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegular).required(),
})





