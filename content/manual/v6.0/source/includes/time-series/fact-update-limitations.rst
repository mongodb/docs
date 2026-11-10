- You can only match on the ``metaField`` field value.
- You can only modify the ``metaField`` field value.
- Your update document can only contain :ref:`update operator
  <update-operators>` expressions.
- Your update command must not limit the number of documents to be
  updated. Set ``multi: true`` or use the
  :method:`~db.collection.updateMany()` method. 
- Your update command must not set :ref:`upsert: true <update-upsert>`.
