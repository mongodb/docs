// :snippet-start: insert-many-movies
db.movies.insertMany([
   {
      title: "Oppenheimer",
      genres: ["Biography", "Drama", "History"],
      runtime: 180,
      rated: "R",
      year: 2023,
      directors: ["Christopher Nolan"],
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
      type: "movie"
   },
   {
      title: "Barbie",
      genres: ["Adventure", "Comedy", "Fantasy"],
      runtime: 114,
      rated: "PG-13",
      year: 2023,
      directors: ["Greta Gerwig"],
      cast: ["Margot Robbie", "Ryan Gosling"],
      type: "movie"
   },
   {
      title: "Poor Things",
      genres: ["Comedy", "Drama", "Romance"],
      runtime: 141,
      rated: "R",
      year: 2023,
      directors: ["Yorgos Lanthimos"],
      cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe"],
      type: "movie"
   }
])
// :snippet-end:
