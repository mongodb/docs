// :snippet-start: sort-consistent
db.getSiblingDB("sample_restaurants").restaurants.find(
   { borough: { $in: [ "Brooklyn", "Manhattan" ] } },
   { name: 1, borough: 1 }
).sort( { borough: 1, _id: 1 } ).limit( 5 )
// :snippet-end:
