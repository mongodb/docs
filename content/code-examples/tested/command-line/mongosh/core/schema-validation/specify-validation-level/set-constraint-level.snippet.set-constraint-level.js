db.runCommand( {
   collMod: "movies",
   validationLevel: "constraint",
   validationAction: "error"
} )
