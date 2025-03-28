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

   the {+atlas-ui+} doesn't support building indexes with a rolling 
   build for ``M0`` {+Free-clusters+}, {+Flex-clusters+}, and ``M2/M5`` 
   {+Shared-clusters+}. You can't build indexes with a rolling build 
   for {+Serverless-instances+}.

For workloads which cannot tolerate performance decrease due to index 
builds, consider building indexes in a rolling fashion.

To maintain {+cluster+} availability:

- |service| removes one node from the {+cluster+} at a time
  starting with a :term:`secondary <secondary>`.

- More than one node can go down at a time, but |service| always keeps 
  a majority of the nodes online.

|service| automatically cancels rolling index builds 
that don't succeed on all nodes. When a rolling index build completes 
on some nodes, but fails on others, |service| cancels the build
and removes the index from any nodes that it was successfully built on. 

In the event of a rolling index build cancellation,
|service| generates an :ref:`activity feed event <view-activity-feed>`
and sends a notification email to the project owner 
with the following information:

- Name of the {+cluster+} on which the rolling index build failed
- Namespace on which the rolling index build failed
- Project that contains the {+cluster+} and namespace
- Organization that contains the project
- Link to the :ref:`activity feed event <view-activity-feed>`

To learn more about rebuilding indexes, see :manual:`Build Indexes on
Replica Sets </tutorial/build-indexes-on-replica-sets>`.

.. note::

   :manual:`Unique 
   </reference/method/db.collection.createIndex#options-for-all-index-types>` 
   :manual:`index options 
   </reference/method/db.collection.createIndex/#options>` are 
   incompatible with building indexes in a rolling fashion. If you specify ``unique`` in the :guilabel:`Options`
   pane, |service| rejects your configuration with an error message.
