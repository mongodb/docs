// This code works 
use admin
db.runCommand( { renameCollection: "staff.employees", to: "staff.salaried" } )
