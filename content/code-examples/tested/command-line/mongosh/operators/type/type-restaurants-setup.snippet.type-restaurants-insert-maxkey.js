db.restaurants.insertOne( {
   _id : 2,
   address : {
      building : "1166",
      coord : [ -73.955184, 40.738589 ],
      street : "Manhattan Ave",
      zipcode : "11222"
   },
   borough: "Brooklyn",
   cuisine: "Bakery",
   grades: [
      { date : new Date(1393804800000), grade : MaxKey(), score : 2 },
      { date : new Date(1378857600000), grade : "B", score : 6 },
      { date : new Date(1358985600000), grade : MaxKey(), score : 3 },
      { date : new Date(1322006400000), grade : "B", score : 5 }
   ],
   name : "Dainty Daisey's Donuts",
   restaurant_id : "30075449"
} )
