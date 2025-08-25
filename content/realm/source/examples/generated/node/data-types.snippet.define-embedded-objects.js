const AddressSchema = {
  name: "Address",
  embedded: true, // default: false
  properties: {
    street: "string?",
    city: "string?",
    country: "string?",
    postalCode: "string?",
  },
};

const ContactSchema = {
  name: "Contact",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    address: "Address", // Embed a single object
  },
};

const BusinessSchema = {
  name: "Business",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    addresses: { type: "list", objectType: "Address" }, // Embed an array of objects
  },
};
