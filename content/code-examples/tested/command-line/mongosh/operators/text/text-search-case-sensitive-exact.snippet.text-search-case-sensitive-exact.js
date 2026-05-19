db.articles.find( {
   $text: { $search: "\"Café Con Leche\"", $caseSensitive: true }
} )
