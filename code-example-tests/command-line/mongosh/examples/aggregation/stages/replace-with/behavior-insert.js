// :snippet-start: insert-collection
db.collection.insertMany([
   { "_id": 1, "name" : { "first" : "John", "last" : "Backus" } },
   { "_id": 2, "name" : { "first" : "John", "last" : "McCarthy" } },
   { "_id": 3, "name": { "first" : "Grace", "last" : "Hopper" } },
   { "_id": 4, "firstname": "Ole-Johan", "lastname" : "Dahl" },
])
// :snippet-end:
