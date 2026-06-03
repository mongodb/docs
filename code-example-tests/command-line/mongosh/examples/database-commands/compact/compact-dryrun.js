// :snippet-start: compact-dryrun
db.runCommand( {
   compact: "movies",
   dryRun: true,
   force: true
} )
// :snippet-end:
