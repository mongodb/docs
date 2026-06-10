db.students.insertOne( {
   name: "Alice",
   year: Int32( 2019 ),
   major: "History",
   gpa: Double( 3.0 ),
   address: {
      city: "NYC",
      street: "33rd Street"
   }
} )
