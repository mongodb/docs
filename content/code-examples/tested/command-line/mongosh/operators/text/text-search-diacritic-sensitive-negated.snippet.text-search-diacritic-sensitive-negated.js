db.articles.find(
   { $text: { $search: "leches -cafés", $diacriticSensitive: true } }
)
