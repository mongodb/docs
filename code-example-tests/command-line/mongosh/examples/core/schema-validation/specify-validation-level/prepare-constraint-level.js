// :snippet-start: prepare-constraint-level
db.runCommand( {
   collMod: "movies",
   prepareConstraintValidationLevel: true
} )
// :snippet-end:
