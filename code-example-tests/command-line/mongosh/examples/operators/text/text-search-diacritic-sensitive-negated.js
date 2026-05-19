// :snippet-start: text-search-diacritic-sensitive-negated
db.articles.find(
   { $text: { $search: "leches -cafés", $diacriticSensitive: true } }
)
// :snippet-end:
