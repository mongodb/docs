// :snippet-start: find-element-in
db.movies.find( { genres: { $in: [ "Documentary", "History" ] } } ).limit(5)
// :snippet-end:
