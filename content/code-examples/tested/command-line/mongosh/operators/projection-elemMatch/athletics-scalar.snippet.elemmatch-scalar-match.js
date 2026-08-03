db.schools.find( { zipcode: "63109" },
                { athletics: { $elemMatch: { $eq: "basketball" } } })
