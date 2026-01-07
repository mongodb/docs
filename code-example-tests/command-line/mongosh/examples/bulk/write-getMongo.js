db.getMongo().bulkWrite(
   [
      {
         namespace: 'sample_mflix.users',
         name: 'insertOne',
         document: { 
            name: 'Cersei Lannister',
            email: 'cersei.l@example.com',
            password: '$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu'
         }
      },
      {
         namespace: 'sample_mflix.theaters',
         name: 'updateOne',
         filter: { theaterId: 1000 },
         update: { $set: { 
            "location.address.street1": "350 W Market",
            "location.address.city": "Bloomington"
         } }
      },
      {
         namespace: 'sample_mflix.users',
         name: 'insertOne',
         document: { 
            name: 'Sansa Stark',
            email: 'sansa.s@example.com',
            password: '$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu'
         }
      }
   ],
   {
      ordered: true,
      bypassDocumentValidation: true,
      verboseResults: true
   }
)
