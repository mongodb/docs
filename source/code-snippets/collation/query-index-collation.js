// start query index collation
myColl.find({"year": 1980}, {"collation" : {"locale" : "en_US" }})
  .sort({"title": -1});
// end query index collation

// start query without index collation
// no collation specified
myColl.find({"year": 1980})
  .sort({"title": -1});

// collation differs from the one on the index
myColl.find({"year": 1980}, {"collation" : {"locale" : "en_US", "strength": 2 }})
  .sort({"title": -1});
// end query without index collation
