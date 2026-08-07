// :snippet-start: set-constraint-level
db.runCommand( {
   collMod: "movies",
   validationLevel: "constraint",
   validationAction: "error"
} )
// :snippet-end:
