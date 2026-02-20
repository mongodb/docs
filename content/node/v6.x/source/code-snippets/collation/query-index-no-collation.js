/*
   Retrieve documents that match the "year" value "1980"
   in descending order of the value of the "title" field
   that does not use the collation index.
*/
// start index no collation
myColl.find({"year": 1980})
  .sort({"title": -1});
// end index no collation