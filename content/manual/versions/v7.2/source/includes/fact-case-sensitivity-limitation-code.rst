
.. example::

   If the database ``salesDB`` already exists MongoDB will 
   return an error if if you attempt to create a database named ``salesdb``. 

   .. code-block:: javascript

      mixedCase = db.getSiblingDB('salesDB')
      lowerCase = db.getSiblingDB('salesdb')
      
      mixedCase.retail.insertOne({ "widgets": 1, "price": 50 })

   The operation succeeds and :method:`~db.collection.insertOne()` implicitly
   creates the ``SalesDB`` database.

   .. code-block:: javascript

      lowerCase.retail.insertOne({ "widgets": 1, "price": 50 })

   The operation fails. :method:`~db.collection.insertOne()` tries to 
   create a ``salesdb`` database and is blocked by the naming 
   restriction. Database names must differ on more than just case.

   .. code-block:: javascript

       lowerCase.retail.find()

   This operation does not return any results because the database names are case
   sensitive. There is no error because :method:`~db.collection.find()` doesn't
   implicitly create a new database.