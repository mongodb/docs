// :snippet-start: create-text-index-comments
db.comments.createIndex(
   {
     name: "text",
     text: "text"
   },
   {
     name: "CommentsTextIndex"
   }
)
// :snippet-end:
