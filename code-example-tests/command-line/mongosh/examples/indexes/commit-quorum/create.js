// :snippet-start: create-index-commit-quorum
db.movies.createIndex(
    { "title": 1 },
    { },
    "majority"
)
// :snippet-end: