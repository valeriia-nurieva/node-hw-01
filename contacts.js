const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const changedContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(changedContacts, null, 2));
    return contacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: uuidv4(), name, email, phone };
    const contacts = await listContacts();
    const changedContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(changedContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
