import fs from 'fs/promises';
import path from 'path';
import {nanoid} from 'nanoid';

const contactsPath = path.resolve ('db', 'contacts.json');

export const listContacts = async () => {
  const contacts = await fs.readFile (contactsPath);
  return JSON.parse (contacts);
};

export const getContactById = async contactId => {
  const contacts = await listContacts ();
  const contactById = contacts.find (item => item.id === contactId);
  return contactById || null;
};

export const removeContact = async contactId => {
  const contacts = await listContacts ();
  const index = contacts.findIndex (item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice (index, 1);
  fs.writeFile (contactsPath, JSON.stringify (contacts, null, 1));
  return deletedContact;
};

export const addContact = async data => {
  const contacts = await listContacts ();
  const newContact = {
    id: nanoid (),
    ...data,
  };
  contacts.push (newContact);
  fs.writeFile (contactsPath, JSON.stringify (contacts, null, 1));
  return newContact;
};

export const updateContactById = async (contactId, data) => {
  const contacts = await listContacts ();
  const index = contacts.findIndex (item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {...contacts[index], ...data};
  fs.writeFile (contactsPath, JSON.stringify (contacts, null, 1));
  return contacts[index];
};
