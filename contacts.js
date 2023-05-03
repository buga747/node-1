const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId);

    if (!contact) {
      console.error(`Contact with id=${contactId} not found`);
      return;
    }

    console.table(contact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex(({ id }) => id === contactId);

    if (idx === -1) {
      console.error(`Contact with id=${contactId} not found`);
      return;
    }

    const newContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with id=${contactId} removed`);
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    const newContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("New contact added");
    console.table(newContact);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
