Requirements
------------

You must use:

- MongoDB 8.0 or higher.

During the Preview period, you must use:

- {+mongosh+} or :compass:`Compass </>` to create and manage MongoDB 
  Views.

- {+atlas-ui+} and the {+atlas-admin-api+} to create
  |product-name| indexes on Views.  Support for {+mongosh+}, 
  :compass:`Compass </>`, and :driver:`Drivers </>` will be available 
  when this feature is Generally Available.

To edit a View, you must have a :ref:`User Admin <create-user-admin>` 
role and use the :dbcommand:`collMod` database command.

Limitations
-----------

- |product-name| supports Views only for :query:`$expr` in the 
  following stages:
 
  - :pipeline:`$addFields`
  - :pipeline:`$set`
  - :pipeline:`$match`

- Index names must be unique across a source collection and 
  all of its Views.

- |product-name| doesn't support View definitions with variables that 
  produce dynamic results like ``$$USER_ROLES`` and ``$random``.

- |product-name| queries return the original documents as they appear 
  in the source collection.
