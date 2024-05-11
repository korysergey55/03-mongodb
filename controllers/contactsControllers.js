import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema
} from '../schemas/contactsSchemas.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts ();
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.getContactById (id);
    if (!result) {
      throw HttpError (404, `Contact with id=${id} not found`);
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.removeContact (id);
    if (!result) {
      throw HttpError (404, `Contact with id=${id} not found`);
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const {error} = createContactSchema.validate (req.body);
    if (error) {
      throw HttpError (400, error.message);
    }
    const result = await contactsService.createContact (req.body);
    res.status (201).json (result);
  } catch (error) {
    next (error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const {error} = updateContactSchema.validate (req.body);
    if (error) {
      throw HttpError (400, `Body must have at least one field`);
    }
    const {id} = req.params;
    const result = await contactsService.updateContactById (id, req.body);
    if (!result) {
      throw HttpError (404, `Contact with id=${id} not found`);
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const updateStatusContact  = async (req, res, next) => {
  try {
    const {error} = updateStatusSchema.validate (req.body);
    if (error) {
      throw HttpError (400, `Body must have favorite status field`);
    }
    const {id} = req.params;
    const result = await contactsService.updateContactById (id, req.body);
    if (!result) {
      throw HttpError (404, `Contact with id=${id} not found`);
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};
