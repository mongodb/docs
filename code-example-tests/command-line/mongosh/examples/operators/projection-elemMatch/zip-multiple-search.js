// :snippet-start: elemmatch-multiple-fields
db.schools.find( { zipcode: "63109" },
                { students: { $elemMatch: { school: 102, age: { $gt: 10 } } } } )
// :snippet-end:
