.. cond:: cloud

   .. include:: /includes/extracts/cloud-rolling-index-procedure-warning-server-68925.rst

.. cond:: onprem

   .. include:: /includes/extracts/om6-rolling-index-procedure-warning-server-68925.rst

.. important::

   Rolling index builds succeed only when they meet certain conditions. 
   To ensure your index build succeeds, avoid the following design 
   patterns that commonly trigger a restart loop:

   - Index key exceeds the :manual:`index key limit 
     </reference/limits/#mongodb-limit-Index-Key-Limit>`
   - :manual:`Index name </indexes/#index-names>` already exists
   - Index on :manual:`more than one array field 
     </core/index-multikey/#compound-multikey-indexes>`
   - Index on collection that has the 
     :manual:`maximum number of text indexes 
     </reference/limits/#mongodb-limit-Number-of-Indexes-per-Collection>`
   - Text index on collection that has the
     :manual:`maximum number of text indexes 
     </core/index-text/#one-text-index-per-collection>`

.. note::

   Data Explorer doesn't support building indexes in a rolling fashion
   for standalone deployments.

Building indexes in a rolling fashion reduces the performance impact of
building indexes on :term:`replica sets <replica set>` and
:term:`sharded clusters <sharded cluster>`. To maintain cluster
availability, |mms| removes one node from the cluster at a time
starting with a :term:`secondary <secondary>`.

After you build an index in a rolling fashion, if your MongoDB database
runs with an :manual:`FCV 
</reference/command/setFeatureCompatibilityVersion>`
less than ``4.2``, :doc:`resync the head database 
</tutorial/resync-backup>` to ensure that the head database takes the 
new index into account.

|mms| automatically cancels rolling index builds 
that don't succeed on all nodes. When a rolling index build completes 
on some nodes, but fails on others, |mms| cancels the build
and removes the index from any nodes that it was successfully built on. 

In the event of a rolling index build cancellation, |mms| generates an 
activity feed event and sends a notification email to the project owner 
with the following information:

- Name of the cluster on which the rolling index build failed
- Namespace on which the rolling index build failed
- Project that contains the cluster and namespace
- Organization that contains the project
- Link to the activity feed event

To learn more about rebuilding indexes, see :manual:`Build Indexes on
Replica Sets </tutorial/build-indexes-on-replica-sets>`.

.. note::

   The following :manual:`index options 
   </reference/method/db.collection.createIndex#options>` are 
   incompatible with building indexes in a rolling fashion:

   - :manual:`unique
     </reference/method/db.collection.createIndex#options-for-all-index-types>`

   - :manual:`storageEngine
     </reference/method/db.collection.createIndex#options-for-all-index-types>`

   - :manual:`textIndexVersion
     </reference/method/db.collection.createIndex#options-for-text-indexes>`

   - :manual:`2dsphereIndexVersion
     </reference/method/db.collection.createIndex#options-for-2d-indexes>`

   |mms| ignores these options if you specify them in the
   :guilabel:`Options` pane.
