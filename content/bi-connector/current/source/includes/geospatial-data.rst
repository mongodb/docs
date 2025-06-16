Geospatial Data
---------------

If a collection contains a ``2d`` or ``2dsphere``
:manual:`geospatial index </applications/geospatial-indexes>`,
|bi-short| maps the indexed field into an array of numeric
longitude-latitude coordinates.

Example
~~~~~~~

Given the following collection:

.. code-block:: javascript

   db.points.createIndex( { pos : "2dsphere" } )
   db.points.insertOne({
       pos : { type: "Point", coordinates: [ -73.97, 40.77 ] },
       name: "Central Park",
       category : "Parks"
   })

|bi-short| generates the following schema:

.. code-block:: yaml
   :copyable: false

   schema:
   - db: test
     tables:
     - table: points
       collection: points
       pipeline: []
       columns:
       - Name: _id
         MongoType: bson.ObjectId
         SqlName: _id
         SqlType: varchar
       - Name: category
         MongoType: string
         SqlName: category
         SqlType: varchar
       - Name: name
         MongoType: string
         SqlName: name
         SqlType: varchar
       - Name: pos.coordinates
         MongoType: geo.2darray
         SqlName: pos.coordinates
         SqlType: numeric[]

.. include:: /includes/fact-geospatial-views.rst
