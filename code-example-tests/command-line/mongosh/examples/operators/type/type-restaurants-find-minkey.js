// :snippet-start: type-restaurants-find-minkey
db.restaurants.find(
   { "grades.grade" : { $type : "minKey" } }
)
// :snippet-end:
