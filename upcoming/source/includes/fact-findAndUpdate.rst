
Retryable writes require the |findMethod| method to copy the entire document into
a special side collection for each node in a replica set before it performs
the update. This can make |findMethod| an expensive operation when dealing with
large documents or large replica sets.

.. versionadded:: 8.0

   To update the first document in a user-defined ordering with
   better performance, use the :method:`db.collection.updateOne`
   method with the ``sort`` option.
