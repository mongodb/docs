// :snippet-start: text-search-diacritic-sensitive-term
db.articles.find(
   { $text: { $search: "CAFÉ", $diacriticSensitive: true } }
)
// :snippet-end:
