collection.aggregate(
  [
    { $group: { "_id": "$first_name", "nameCount": { "$sum": 1 } } },
    { $sort: { "_id": 1 } },
  ],
  { collation: { locale: "de@collation=phonebook" } },
);
