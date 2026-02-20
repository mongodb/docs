/*
   Retrieve documents that match "New York" in the "city" field,
   sorted by the "name" field by using the German collation.
*/
// start find sort collation
myColl.find({ city: "New York" }, { collation: { locale: "de" } })
  .sort({ name: 1 });
// end find sort collation