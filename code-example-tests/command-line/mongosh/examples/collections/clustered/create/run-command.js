// :snippet-start: run-command
db.runCommand( {
   create: "products",
   clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "products clustered key" }
} )
// :snippet-end:
