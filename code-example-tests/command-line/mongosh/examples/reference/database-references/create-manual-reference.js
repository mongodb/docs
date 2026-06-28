// :snippet-start: create-manual-reference
const original_id = db.movies.insertOne({
    title: "Reference Demo Film 2099"
}).insertedId

db.comments.insertOne({
    name: "Reference Demo Viewer",
    movie_id: original_id,
    text: "A thrilling adventure set in the future."
})
// :snippet-end:
