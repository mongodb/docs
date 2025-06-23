- Wildcard indexes omit the ``_id`` field by default. To include the
  ``_id`` field in a wildcard index, you must explicitly include it in
  the ``wildcardProjection`` document.
  
  .. code-block:: javascript
    
     db.salesData.createIndex(
        { "$**" : 1 },
        { "wildcardProjection" :
           { "_id": 1, "customers.lastName": 1, "customers.FirstName": 1, }
        }
     )

- You can create more than one wildcard index on a collection.

- A wildcard index may cover the same fields as other indexes in the 
  collection.

- Wildcard indexes are :ref:`sparse <index-type-sparse>`. They only
  include entries for documents that contain the indexed field.

  The document is not indexed if all of the fields in the compound
  wildcard index are missing.
