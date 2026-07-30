db.schools.find( { zipcode: "63109" },
                { students: { $elemMatch: { school: 102 } } } )
