// :snippet-start: type-restaurants-find-maxkey
db.restaurants.find(
   { "grades.grade" : { $type : "maxKey" } }
)
// :snippet-end:
