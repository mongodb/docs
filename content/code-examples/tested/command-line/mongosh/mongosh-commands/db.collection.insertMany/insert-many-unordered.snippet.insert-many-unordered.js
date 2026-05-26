try {
   db.movies.insertMany( [
      { _id: 10, title: "Inception", year: 2010 },
      { _id: 11, title: "The Matrix", year: 1999 },
      { _id: 11, title: "Interstellar", year: 2014 },
      { _id: 12, title: "Arrival", year: 2016 },
      { _id: 13, title: "Blade Runner 2049", year: 2017 },
      { _id: 13, title: "Ex Machina", year: 2014 },
      { _id: 14, title: "Her", year: 2013 }
   ], { ordered: false } )
} catch (e) {
   print(e)
}
