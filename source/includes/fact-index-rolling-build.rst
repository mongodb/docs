.. note::

   Data Explorer does not support building indexes with a rolling build
   for ``M0`` Free Tier and ``M2/M5`` shared clusters.

Building indexes in a rolling fashion reduces the performance impact of
building indexes on :term:`replica sets <replica set>` and
:term:`sharded clusters <sharded cluster>`. To maintain cluster
availability, |service| removes one node from the cluster at a time
starting with a :term:`secondary <secondary>`.

To learn more about rebuilding indexes, see :manual:`Build Indexes on
Replica Sets </tutorial/build-indexes-on-replica-sets>`.

.. note::

   The following index options are incompatible with building indexes in
   a rolling fashion:

   * :manual:`unique
     </reference/method/db.collection.createIndex#options-for-all-index-types>`

   * :manual:`storageEngine
     </reference/method/db.collection.createIndex#options-for-all-index-types>`

   * :manual:`textIndexVersion
     </reference/method/db.collection.createIndex#options-for-text-indexes>`

   * :manual:`2dsphereIndexVersion
     </reference/method/db.collection.createIndex#options-for-2d-indexes>`

   If you specify any of these options in the :guilabel:`Options` pane, 
   |service| rejects your configuration with an error message.
