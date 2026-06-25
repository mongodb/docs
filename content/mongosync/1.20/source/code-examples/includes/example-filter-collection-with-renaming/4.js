// This code produces an error and mongosync stops syncing 
use admin
db.runCommand( { renameCollection: "students.graduate", to: "students.notAFilteredCollection" } )
