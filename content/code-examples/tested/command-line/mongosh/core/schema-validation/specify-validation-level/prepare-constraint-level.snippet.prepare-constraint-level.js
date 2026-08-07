db.runCommand( {
   collMod: "movies",
   prepareConstraintValidationLevel: true
} )
