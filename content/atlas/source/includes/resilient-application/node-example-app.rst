.. note::
   The following server application uses
   `Express <https://github.com/expressjs/express>`__,
   which you need to add to your project as a dependency
   before you can run it.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 5, 13, 33, 47

   const express = require('express');
   const bodyParser = require('body-parser');

   // Use the latest client libraries by installing & importing them
   const MongoClient = require('mongodb').MongoClient;

   const app = express();
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));

   const uri = "mongodb+srv://<db_username>:<db_password>@cluster0-111xx.mongodb.net/test?retryWrites=true&w=majority";

   const client = new MongoClient(uri);

   // ----- API routes ----- //
   app.get('/', (req, res) => res.send('Welcome to my API!'));

   app.get('/users', (req, res) => {
       const collection = client.db("test").collection("users");

       collection
       .find({})
       .maxTimeMS(5000)
       .toArray((err, data) => {
           if (err) {
               res.send("The request has timed out. Please check your connection and try again.");
           }
           return res.json(data);
       });
   });

   app.post('/users', (req, res) => {
       const collection = client.db("test").collection("users");
       collection.insertOne({ name: req.body.name })
       .then(result => {
           res.send("User successfully added!");
       }, err => {
           res.send("An application error has occurred. Please try again.");
       })
   });
   // ----- End of API routes ----- //

   app.listen(3000, () => {
       console.log(`Listening on port 3000.`);
       client.connect(err => {
           if (err) {
               console.log("Not connected: ", err);
               process.exit(0);
           }
           console.log('Connected.');
       });
   });
