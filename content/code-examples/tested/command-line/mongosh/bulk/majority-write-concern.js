db.users.bulkWrite( [
   { updateMany: {
      filter: { name: { $regex: /Stark$/ } },
      update: { $set: { house: "Stark", verified: false } }
   } },
   { updateOne: {
      filter: { name: "Ned Stark" },
      update: { $set: { title: "Lord of Winterfell" } }
   } },
   { updateOne: {
      filter: { name: "Catelyn Stark" },
      update: { $set: { title: "Lady of Winterfell" } }
   } } ],
   { writeConcern: { w: "majority", wtimeout: 100 } }
)