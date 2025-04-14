To create a TTL index, use :method:`~db.collection.createIndex()`.
Specify an index field that is either a :ref:`date type
<document-bson-type-date>` or an array that contains date type values. 
Use the ``expireAfterSeconds`` option to specify a TTL value in seconds.