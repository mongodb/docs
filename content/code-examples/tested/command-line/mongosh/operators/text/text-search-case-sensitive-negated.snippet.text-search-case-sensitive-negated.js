db.articles.find(
   { $text: { $search: "Coffee -shop", $caseSensitive: true } }
)
