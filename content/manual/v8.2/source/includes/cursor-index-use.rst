
.. note:: Index Use

   To use an index with the :method:`~cursor.max()` method, you must use the
   :method:`~cursor.hint()` method to specify the index you want to use,
   except when the :method:`~db.collection.find()` query is an equality
   condition on the ``_id`` field.

