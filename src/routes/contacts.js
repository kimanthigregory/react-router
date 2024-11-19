export async function getContacts() {
  return [
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
}

export async function createContacts(newContact) {
  // Simulate generating a new contact ID (e.g., from the server or database)
  const contactId = Date.now().toString(); // Using timestamp as unique ID

  // Simulate the new contact data
  const createdContact = {
    id: contactId,
    first: newContact.first || "",
    last: newContact.last || "",
    favorite: newContact.favorite || false,
  };

  // In a real-world scenario, here we would save the contact to a database or API.
  // For this example, we will just return the created contact.

  return createdContact;
}
