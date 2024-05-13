import Contact from '../models/Contact.js';

export const getAllContacts = async () => {
  return Contact.find ();
};

export const getContactById = async contactId => {
  const contactById = await Contact.findById (contactId);
  return contactById;
};

export const createContact = async data => {
  const addedContact = await Contact.create ({...data,favorite:false});
  return addedContact;
};

export const updateContactById = async (contactId, data) => {
  const updatedContact = await Contact.findByIdAndUpdate (
    {_id: contactId},
    data,
    {new: true, runValidators: true}
  );
  return updatedContact;
};

export const removeContact = async contactId => {
  const deletedContact = await Contact.findOneAndDelete({_id: contactId});
  return deletedContact;
};


export const getFavoritesContacts = async () => {
const contact = await Contact.find ({favorite:true});
  return contact
};

