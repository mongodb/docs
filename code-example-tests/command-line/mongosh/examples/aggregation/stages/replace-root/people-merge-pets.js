// :snippet-start: replace-root-merge-pets
db.people.aggregate( [
   { $replaceRoot: { newRoot: { $mergeObjects:  [ { dogs: 0, cats: 0, birds: 0, fish: 0 }, "$pets" ] } } }
] )
// :snippet-end:
