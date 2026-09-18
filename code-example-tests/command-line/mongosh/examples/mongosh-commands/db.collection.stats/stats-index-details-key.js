// :snippet-start: stats-index-details-key
db.movies.stats(
   {
      'indexDetails' : true,
      'indexDetailsKey' :
      {
         '_fts' : 'text',
         '_ftsx' : 1
      }
   }
)
// :snippet-end:
