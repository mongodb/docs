/* 
   Delete the first document that contains a value greater
   than 100 in the "a" field when ordered by using the
   English numeric collation order.
*/
// start findOneAndDelete collation
myColl.findOneAndDelete(
  { a: { $gt: "100" } },
  { collation: { locale: "en", numericOrdering: true } },
);
// end findOneAndDelete collation