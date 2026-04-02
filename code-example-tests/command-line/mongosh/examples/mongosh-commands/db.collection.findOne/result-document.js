// :snippet-start: result-document
var myDocument = db.movies.findOne();

if (myDocument) {
   var myTitle = myDocument.title;
   print(myTitle);
}
// :snippet-end: