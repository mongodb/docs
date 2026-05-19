// :snippet-start: text-search-case-sensitive-term
db.articles.find(
   { $text: { $search: "Coffee", $caseSensitive: true } }
)
// :snippet-end:
