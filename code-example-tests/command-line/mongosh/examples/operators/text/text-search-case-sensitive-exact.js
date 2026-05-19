// :snippet-start: text-search-case-sensitive-exact
db.articles.find( {
   $text: { $search: "\"Café Con Leche\"", $caseSensitive: true }
} )
// :snippet-end:
