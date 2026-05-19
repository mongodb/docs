// :snippet-start: text-search-case-diacritic-insensitive
db.articles.find( { $text: { $search: "сы́рники CAFÉS" } } )
// :snippet-end:
