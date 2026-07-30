// :snippet-start: elemmatch-object-match
db.schools.find( { zipcode: "63109" },
                { athletics: { $elemMatch: { athletics: "basketball" } } })
// :snippet-end:
