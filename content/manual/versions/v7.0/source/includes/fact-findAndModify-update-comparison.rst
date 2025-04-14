When updating a document, |operation| and the
:method:`~db.collection.updateOne()` method operate differently:

- If multiple documents match the update criteria, for
  |operation|, you can specify a ``sort`` to provide some
  measure of control on which document to update.

  :method:`~db.collection.updateOne()` updates the first document that
  matches.

- By default, |operation| returns |return-object|. To
  obtain the updated document, use the ``new`` option.

  The :method:`~db.collection.updateOne()` method returns a
  :method:`WriteResult` object that contains the status of the operation.
  
  To return the updated document, use the :method:`~db.collection.find()`
  method. However, other updates may have modified the document between
  your update and the document retrieval. Also, if the update modified
  only a single document but multiple documents matched, you will need to
  use additional logic to identify the updated document.

When modifying a *single* document, both |operation| and the
:method:`~db.collection.updateOne()` method *atomically* update the
document. See :doc:`/core/write-operations-atomicity` for more
details about interactions and order of operations of these methods.
