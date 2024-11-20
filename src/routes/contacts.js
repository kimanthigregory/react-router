let contacts = [
  {
    id: "1",
    first: "John",
    last: "Doe",
    avatar: "https://robohash.org/1.png?size=200x200",
    twitter: "john_doe",
    notes: "Some notes about John",
    favorite: true,
  },
  {
    id: "2",
    first: "Jane",
    last: "Smith",
    avatar: "https://robohash.org/2.png?size=200x200",
    twitter: "jane_smith",
    notes: "Some notes about Jane",
    favorite: false,
  },
];

console.log(contacts);
export async function getContacts() {
  return contacts;
}

export async function createContacts() {
  const contactId = Date.now().toString(); // Unique ID
  const createdContact = {
    id: contactId,
    first: "",
    last: "",
    favorite: false,
    twitter: "",
    notes: "",
    avatar: ``,
  };

  contacts.push(createdContact); // Add the new contact to the list
  return createdContact;
}

// Function to update the contact
export async function updateContact(contactId, updatedFields) {
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    throw new Error(`Contact with ID ${contactId} not found`);
  }
  console.log(updatedFields);

  // Update the contact's fields
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...updatedFields,
  };

  return contacts[contactIndex]; // Return the updated contact
}
