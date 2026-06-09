Indexes Change to ``FAILED``
----------------------------

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

Indexes Change to ``STALE``
---------------------------

Indexes change to the ``STALE`` status in the following scenarios:

.. warning::

   If the aggregation pipeline defined in your View is incompatible 
   with the documents in the collection, search replication fails. 
   For example, if a ``$toDouble`` expression operates on a document 
   field that contains an array, the replication fails. Ensure your 
   View works with all documents in the collection without errors.

- If the View definition causes an aggregation failure 
  while an index is ``READY``, the index becomes ``STALE``. The 
  index will return to ``READY`` after you resolve the document or 
  change the view definition so that it doesn't fail anymore. When 
  ``STALE``, the index remains queryable. If the index falls off the 
  :term:`oplog`, an index rebuild is triggered.

- If the View definition causes an aggregation pipeline
  failure while the index is ``BUILDING``, the index build is stuck 
  until you fix the document. The index will return to 
  ``READY`` after you resolve the document or change the view 
  definition so that it doesn't fail anymore.

You can view index statuses in the {+atlas-ui+} on the 
:ref:`index status details <fts-index-statuses>` page.

Error: ``$search`` is only valid as the first stage in a pipeline
-----------------------------------------------------------------

This error appears when you query a view using a MongoDB version 
before 8.1.

- If you use a MongoDB version before 8.0, we recommend you upgrade to
  8.1+ to query the view directly. You can upgrade to 8.0 to query the 
  source collection.

- If you use MongoDB 8.0, you must query the view index against the 
  source collection. For example, run ``.aggregate()`` on the 
  collection instead of the view.
