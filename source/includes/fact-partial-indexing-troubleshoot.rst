Indexes change to the ``FAILED`` status in the following scenarios:

- You create an index on a View that is incompatible with 
  |product-name|.

- You edit a View in a way that does not meet the |product-name| 
  compatibility requirements.
    
- You remove or change a View's source collection.

  For example, if one View is created on another View, and you 
  change the parent View source to another collection.

  .. note::

     This limitation also applies if a View is a descendent 
     of other Views. For example, you can't change or remove 
     the source collection that all descendents originate from.

Indexes stall in the following scenarios:

.. warning::

   If the aggregation pipeline defined in your View is incompatible 
   with the documents in the collection, search replication fails. 
   For example, if a ``$toDouble`` expression operates on a document 
   field that contains an array, the replication fails. Ensure your 
   View works with all documents in the collection without errors.

- If the View definition causes an aggregation failure 
  while an index is ``READY``, the index becomes ``STALE``. The 
  index will return to ``READY`` after you resolve the document or 
  change the view definition so that it doesn't fail anymore. However,
  the index is queryable until the replication is automatically 
  removed from the :term:`oplog`.

- If the View definition causes an aggregation pipeline
  failure while the index is ``BUILDING``, the index build is stuck 
  until you fix the document. The index will return to 
  ``READY`` after you resolve the document or change the view 
  definition so that it doesn't fail anymore.

You can view index statuses in the {+atlas-ui+} on the 
:ref:`index status details <queryable-index>` page.
