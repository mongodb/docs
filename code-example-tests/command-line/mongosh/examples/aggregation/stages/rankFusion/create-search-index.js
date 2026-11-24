// :snippet-start: rankfusion-search-index
db.embedded_movies.createSearchIndex(
   "search_index",
   {
      mappings: { dynamic: true }
   }
)
// :snippet-end:
