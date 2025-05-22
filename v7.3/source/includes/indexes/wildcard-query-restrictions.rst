Field does **not** exist
  Wildcard indexes cannot support document queries when an indexed field
  does **not** exist.

  For example, consider a collection ``inventory`` with a wildcard
  index on ``product_attributes``. The wildcard index
  **cannot** support the following queries:

  .. code-block:: javascript
     :copyable: false

     db.inventory.find( {"product_attributes" : { $exists : false } } )

     db.inventory.aggregate([
       { $match : { "product_attributes" : { $exists : false } } }
     ])

Field is equal to a document or an array
  Wildcard indexes generate entries for the **contents** of a
  document or array, and not the document or array itself. Therefore,
  wildcard indexes don't support exact document or array equality 
  matches. Wildcard indexes *can* support querying where 
  the field equals an empty document ``{}``.

  For example, consider a collection ``inventory`` with a wildcard
  index on ``product_attributes``. The wildcard index
  **cannot** support the following queries:

  .. code-block:: javascript
     :copyable: false

     db.inventory.find({ "product_attributes" : { "price" : 29.99 } } )
     db.inventory.find({ "product_attributes.tags" : [ "waterproof", "fireproof" ] } )

     db.inventory.aggregate([{ 
       $match : { "product_attributes" : { "price" : 29.99 } }
     }])

     db.inventory.aggregate([{ 
       $match : { "product_attributes.tags" : ["waterproof", "fireproof" ] } }
     }])

Field is not equal to a document or array
  Wildcard indexes generate entries for the **contents** of a
  document or array, and not the document/array itself. Therefore,
  wildcard indexes don't support exact document or array
  inequality matches.

  For example, consider a collection ``inventory`` with a wildcard
  index on ``product_attributes``. The wildcard index
  **cannot** support the following queries:

  .. code-block:: javascript
     :copyable: false

     db.inventory.find( { $ne : [ "product_attributes", { "price" : 29.99 } ] } )
     db.inventory.find( { $ne : [ "product_attributes.tags",  [ "waterproof", "fireproof" ] ] } )

     db.inventory.aggregate([{ 
       $match : { $ne : [ "product_attributes", { "price" : 29.99 } ] }
     }])

     db.inventory.aggregate([{ 
       $match : { $ne : [ "product_attributes.tags", [ "waterproof", "fireproof" ] ] }
     }])

Array Field is equal or not equal to null
  If a given field is an array in any document in the collection,
  wildcard indexes cannot support queries for documents where that
  field is equal or not equal to null.

  For example, consider a collection ``inventory`` with a wildcard
  index on ``product_attributes``. The wildcard index
  **cannot** support the following queries if 
  ``product_attributes.tags`` is an array in any document in the
  collection:

  .. code-block:: javascript
     :copyable: false

     db.inventory.find( { "product_attributes.tags": { $ne: null } } )

     db.inventory.find( { "product_attributes.tags": null } )

     db.inventory.aggregate([{ 
       $match : { "product_attributes.tags": { $ne: null } }
     }])

     db.inventory.aggregate([{ 
       $match : { "product_attributes.tags": null }
     }])

Field is equal to null
  Wildcard indexes cannot support queries for documents where a field
  is equal to null. 
  
  The query ``{ $eq: null }`` matches all documents where the field is
  null or missing, but wildcard indexes don't index null or empty fields. 
  that.

  For example, consider a collection ``inventory`` with a wildcard index
  on ``product_attributes``. The wildcard index **cannot** support the
  following queries:

  .. code-block:: javascript
     :copyable: false


     db.inventory.find( { "product_attributes.price": { $eq: null } } )
     
     db.inventory.aggregate([{
        $match : { "product_attributes.price": { $eq: null } }
     }])

