When updating a document, |operation| and the
:method:`~db.collection.update()` method operate differently:

- By default, both operations modify a single document. However, the
  :method:`~db.collection.update()` method with its ``multi`` option
  can modify more than one document.

- If multiple documents match the update criteria, for
  |operation|, you can specify a ``sort`` to provide some
  measure of control on which document to update.

  With the default behavior of the :method:`~db.collection.update()`
  method, you cannot specify which single document to update when
  multiple documents match.

- By default, |operation| returns |return-object|. To
  obtain the updated document, use the ``new`` option.

  The :method:`~db.collection.update()` method returns a
  :method:`WriteResult` object that contains the status of the operation.
  To return the updated document, use the :method:`~db.collection.find()`
  method. However, other updates may have modified the document between
  your update and the document retrieval. Also, if the update modified
  only a single document but multiple documents matched, you will need to
  use additional logic to identify the updated document.

When modifying a *single* document, both |operation| and the
:method:`~db.collection.update()` method *atomically* update the
document. See :doc:`/core/write-operations-atomicity` for more
details about interactions and order of operations of these methods.
