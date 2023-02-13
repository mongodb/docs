// start findOneAndUpdate without collation
myColl.findOneAndUpdate(
  { first_name : { $lt: "Gunter" } },
  { $set: { verified: true } }
);
// end findOneAndUpdate without collation

// start findOneAndUpdate with collation
myColl.findOneAndUpdate(
  { first_name: { $lt: "Gunter" } },
  { $set: { verified: true } },
  { collation: { locale: "de@collation=phonebook" } },
);
// end findOneAndUpdate with collation
