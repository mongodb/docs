// start create collection with collation
// Create the collection with a collation
db.createCollection("souvenirs", {
  collation: { locale: "fr_CA" },
});
// end create collection with collation

// start collection query without collation
collection.find({type: "photograph"});
// end collection query without collation

 // start collection query with collation
 collection.find({type: "photograph"},
   { collation: { locale: "is", caseFirst: "upper" } }
 );
 // end collection query with collation
