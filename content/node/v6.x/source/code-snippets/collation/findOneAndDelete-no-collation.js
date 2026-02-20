/* 
   Delete the first document that contains a value greater
   than 100 in the "a" field when ordered by using the default
   binary collation order.
*/
// start findOneAndDelete no collation
await myColl.findOneAndDelete({ a: { $gt: "100" } });
// end findOneAndDelete no collation