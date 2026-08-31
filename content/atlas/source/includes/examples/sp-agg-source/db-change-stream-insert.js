db.getSiblingDB("sample_mflix").movies.insertOne({
   title: "The Stream Processor",
   year: 2026
})

db.getSiblingDB("sample_mflix").comments.insertOne({
   name: "Ada Lovelace",
   text: "A fine film about data in motion."
})
