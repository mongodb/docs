/*
   Retrieve documents that match the "year" value "1980"
   in descending order of the value of the "title" field,
   specifying a collation that does not use the collation
   index.
*/
// start not indexed collation
myColl.find({"year": 1980}, {"collation" : {"locale" : "en_US", "strength": 2 }})
  .sort({"title": -1});
// end not indexed collation
