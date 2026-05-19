db.restaurants.insertOne( {
   _id: 1,
   address: {
      building: "230",
      coord: [ -73.996089, 40.675018 ],
      street: "Huntington St",
      zipcode: "11231"
   },
   borough: "Brooklyn",
   cuisine: "Bakery",
   grades: [
      { date : new Date(1393804800000), grade : "C", score : 15 },
      { date : new Date(1378857600000), grade : "C", score : 16 },
      { date : new Date(1358985600000), grade : MinKey(), score : 30 },
      { date : new Date(1322006400000), grade : "C", score : 15 }
   ],
   name : "Dan's Donuts",
   restaurant_id : "30075445"
} )
