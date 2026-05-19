// :snippet-start: text-search-case-sensitive-negated
db.articles.find(
   { $text: { $search: "Coffee -shop", $caseSensitive: true } }
)
// :snippet-end:
