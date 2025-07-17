use admin
db.runCommand( { renameCollection: "staff.employees", to: "staff.onPayroll" } )
