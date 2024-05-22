import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from '../schemas/contactsSchemas.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, favorite = null} = req.query;
    let filter = {owner};
    const fields = '-createdAt -updatedAt';
    const skip = (page - 1) * limit;
    const settings = {skip, limit};

    if (favorite) {
      filter = {owner, favorite};
    }

    const result = await contactsService.getAllContacts ({
      filter,
      fields,
      settings,
    });
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const result = await contactsService.getContactById ({_id, owner});
    if (!result) {
      throw HttpError (404, `Not found`);
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

    const {_id: owner} = req.user;
    const result = await contactsService.createContact ({...req.body, owner});
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
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const result = await contactsService.updateContactById (
      {_id, owner},
      req.body
    );
    if (!result) {
      throw HttpError (404, 'Not found');
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const result = await contactsService.removeContact ({_id, owner});
    if (!result) {
      throw HttpError (404, `Not found`);
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const {error} = updateStatusSchema.validate (req.body);
    if (error) {
      throw HttpError (400, `The body must have a favorite field`);
    }
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const result = await contactsService.updateContactById (
      {_id, owner},
      req.body
    );
    if (!result) {
      throw HttpError (404, 'Not found');
    }
    res.status (200).json (result);
  } catch (error) {
    next (error);
  }
};
