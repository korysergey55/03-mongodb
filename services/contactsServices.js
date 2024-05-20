import Contact from '../models/Contact.js';

export const getAllContacts = (search = {}) => {
  const {filter = {}, fields = '', settings = {}} = search;
  return Contact.find (filter, fields, settings);
};

export const getContactById = filter => Contact.findOne (filter);

export const createContact = data =>
  Contact.create ({...data, favorite: false});

export const updateContactById = (filter, data) =>
  Contact.findByIdAndUpdate (filter, data, {
    new: true,
    runValidators: true,
  });

export const removeContact = async filter => Contact.findOneAndDelete (filter);

export const getFavoritesContacts = async (owner = {}) => {
  const contact = await Contact.find ({owner, favorite: true});
  return contact;
};
