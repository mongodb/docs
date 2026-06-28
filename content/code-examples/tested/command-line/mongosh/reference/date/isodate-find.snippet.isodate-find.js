db.movies.find(
   { released: { $lt: ISODate("2021-02-25T10:03:46.234Z") },
     title: /^ISODate Demo:/ },
   { title: 1, released: 1, _id: 0 }
).sort( { released: 1 } ).toArray()
