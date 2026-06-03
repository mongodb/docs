db.runCommand( {
   compact: "movies",
   dryRun: true,
   force: true
} )
