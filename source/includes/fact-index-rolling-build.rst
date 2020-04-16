.. note::

   Data Explorer does not support building indexes in a rolling fashion
   for standalone deployments.

Building indexes in a rolling fashion reduces the performance impact of
building indexes on :term:`replica sets <replica set>` and
:term:`sharded clusters <sharded cluster>`. To maintain cluster
availability, |mms| removes one node from the cluster at a time
starting with a :term:`secondary <secondary>`.

After you build an index in a rolling fashion, if your MongoDB database
runs with an
:manual:`FCV </reference/command/setFeatureCompatibilityVersion>`
less than ``4.2``,
:doc:`resync the head database </tutorial/resync-backup>` to ensure that
the head database takes the new index into account.

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

   |mms| ignores these options if you specify them in the
   :guilabel:`Options` pane.
