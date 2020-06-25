// start findOneAndUpdate without collation
collection.findOneAndUpdate(
  { first_name : { $lt: "Gunter" } },
  { $set: { verified: true } }
);
// end findOneAndUpdate without collation

// start findOneAndUpdate with collation
collection.findOneAndUpdate(
  { first_name: { $lt: "Gunter" } },
  { $set: { verified: true } },
  { collation: { locale: "de@collation=phonebook" } },
);
// end findOneAndUpdate with collation
