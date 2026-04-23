Requirements
------------

You must use MongoDB 8.0 or higher.

- On MongoDB v8.0+:

  - Use the {+atlas-ui+} or the {+atlas-admin-api+} to create
    |product-name| indexes on Views.  

  - Run the |product-name| queries against the source collection. Reference the |product-name| index that was created on the View. These queries return the original documents as they appear in the source collection.

- On MongoDB v8.1+, you can additionally: 

  - Use {+mongosh+} and :driver:`Driver </>` methods,
    :method:`db.collection.createSearchIndex()`,
    :method:`db.collection.updateSearchIndex()`, 
    :method:`db.collection.dropSearchIndex()`, and
    :pipeline:`$listSearchIndexes` to create and manage |product-name| 
    indexes on Views. 

  - Run the |product-name| queries against the View.
 
To edit a View, you must have a :ref:`User Admin <create-user-admin>` 
role and use the :dbcommand:`collMod` database command.

Limitations
-----------

- |product-name| supports Views with the following stages:
 
  - :pipeline:`$addFields`
  - :pipeline:`$set`
  - :pipeline:`$match` with a :query:`$expr` operator.

- Index names must be unique across a source collection and 
  all of its Views.

- |product-name| doesn't support :manual:`view definitions </core/views>`
  with operators that produce dynamic results, such as
  the :manual:`$$USER_ROLES </reference/aggregation-variables/#mongodb-variable-variable.USER_ROLES>`
  system variable and the :manual:`$rand </reference/operator/aggregation/rand/>`
  aggregation operator.

- |product-name| queries return the original documents as they appear 
  in the source collection.
