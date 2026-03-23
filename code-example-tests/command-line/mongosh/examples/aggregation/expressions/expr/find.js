// :snippet-start: expr-find-viewer-gt-critic
db.movies.find(
   { $expr: { $gt: [ "$tomatoes.viewer.rating", "$tomatoes.critic.rating" ] } },
   { _id: 0, title: 1, "tomatoes.viewer.rating": 1, "tomatoes.critic.rating": 1 }
).sort( { "tomatoes.viewer.rating": -1 } ).limit( 3 )
// :snippet-end: