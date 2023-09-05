 /*
   Retrieve documents that match "photograph" in the "type" field,
   sorted by the Iceland collation and uppercase precedence.
*/
// start specified collation
 myColl.find({type: "photograph"},
   { collation: { locale: "is", caseFirst: "upper" } }
 );
 // end specified collation