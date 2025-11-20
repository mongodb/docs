|fts| starts the initial sync process in the following scenarios:

- When you create a new {+cluster+} or perform certain upgrades on a
  {+cluster+}, an initial sync process occurs.  
- If you add shards to a collection with an existing |fts| index, an
  initial sync occurs on the added shards for that index. 
- If you shard a collection that already has a |fts| index, an initial
  sync occurs on shards where the collection begins to exist. 

The initial sync process includes the following steps:
    
1. The ``mongod`` performs an initial sync.
2. The ``mongot`` performs an initial sync, which rebuilds the search indexes.

While a search index rebuilds, you can still perform ``$search`` queries 
on the existing indexed fields. However, |fts| might return an error if you run a
``$search`` query against a new field or a node that you've recently created. 

.. warning:: 
   
   Rolling resyncs cause colocated search instances to fall off the oplog, which affects
   processes dependant on oplog data. We recommend migrating to :ref:`dedicated search nodes
   <configure-search-nodes>` to avoid this issue.

Check the status of the ``mongot`` initial 
sync using the following steps:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: View the status details.

      a. In the index's ``Status`` column, click 
         :guilabel:`View Status Details`.

      #. Check the state of the index for the node. During ``mongot`` 
         initial sync, the status is ``INITIAL SYNC``. When ``mongot`` 
         finishes rebuilding the index, the status is ``ACTIVE``.
