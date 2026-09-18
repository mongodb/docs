// :snippet-start: stats-index-details-name
db.movies.stats(
   {
      'indexDetails' : true,
      'indexDetailsName' : 'cast_text_fullplot_text_genres_text_title_text'
   }
)
// :snippet-end:
