db.restaurants.find(
   { "grades.grade" : { $type : "maxKey" } }
)
