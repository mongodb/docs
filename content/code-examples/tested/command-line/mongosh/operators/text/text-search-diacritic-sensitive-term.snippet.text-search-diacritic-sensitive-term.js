db.articles.find(
   { $text: { $search: "CAFÉ", $diacriticSensitive: true } }
)
