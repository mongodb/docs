// Create the "souvenirs" collection and specify the French Canadian collation
// start collection collation
db.createCollection("souvenirs", {
  collation: { locale: "fr_CA" },
});
// end collection collation