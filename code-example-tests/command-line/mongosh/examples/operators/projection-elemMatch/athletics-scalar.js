// :snippet-start: elemmatch-scalar-match
db.schools.find( { zipcode: "63109" },
                { athletics: { $elemMatch: { $eq: "basketball" } } })
// :snippet-end:
