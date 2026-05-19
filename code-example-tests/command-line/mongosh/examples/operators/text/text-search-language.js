// :snippet-start: text-search-language
db.articles.find(
   { $text: { $search: "leche", $language: "es" } }
)
// :snippet-end:
