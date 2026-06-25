use admin
db.runCommand( { renameCollection: "students.adjuncts", to: "staff.adjuncts" } )
