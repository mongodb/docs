// :snippet-start: replace-with-merge-pets
db.people.aggregate( [
   { $replaceWith: { $mergeObjects:  [ { dogs: 0, cats: 0, birds: 0, fish: 0 }, "$pets" ] } }
] )
// :snippet-end:
