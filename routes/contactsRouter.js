import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import isValidId from '../middelwarws/isValidId.js';
import authenticate from '../middelwarws/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate)

contactsRouter.get ('/', getAllContacts);

contactsRouter.get ('/:id', isValidId, getOneContact);

contactsRouter.post ('/', createContact);

contactsRouter.put('/:id', isValidId, updateContact);

contactsRouter.delete('/:id', isValidId, deleteContact);

contactsRouter.patch('/:id/favorite', isValidId, updateStatusContact);


export default contactsRouter;
