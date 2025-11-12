// This code works 
use admin
db.runCommand( { renameCollection: "students.graduate", to: "students.adjuncts" } )
