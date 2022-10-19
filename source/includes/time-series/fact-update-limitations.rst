- The query only matches on ``metaField`` field values.
- The update command only modifies the ``metaField`` field value.
- The update document can only contain :ref:`update operator
  <update-operators>` expressions.
- The update command must not limit the number of documents to be
  updated. Set ``multi: true`` or use the
  :method:`~db.collection.updateMany()` method. 
- The update command must not set :ref:`upsert: true <update-upsert>`.
