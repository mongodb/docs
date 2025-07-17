use admin
db.runCommand( { renameCollection: "prospects.current", to: "staff.newHires" } )
