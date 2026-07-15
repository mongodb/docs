// :snippet-start: create-manual-reference-verify
db.comments.findOne(
    { movie_id: original_id },
    { name: 1, text: 1, _id: 0 }
)
// :snippet-end:
