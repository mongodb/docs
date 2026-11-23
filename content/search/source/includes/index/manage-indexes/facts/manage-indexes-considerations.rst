When creating and managing {+fts+} indexes, consider the following:

.. collapsible::
   :heading: Index Consistency and Rebuilding
   :sub_heading: When is query data consistent after updates?
   :expanded: false

   If you make changes to the collection for which you defined {+fts+}
   indexes, the latest data might not be available immediately for
   queries. However, ``mongot`` monitors the change streams, which
   allows it to update stored copies of data, and {+fts+} indexes are
   eventually consistent.

   When you change an index definition, ``mongot`` automatically
   rebuilds the new index in the background, while continuing to serve
   queries with the old index to make sure there is no downtime. It is
   recommended that you wait for the index build to complete before
   running any queries using new index definitions. Using the new index
   during its build process can lead to unexpected results or incomplete
   data. This happens when you deploy ``mongot`` and ``mongod``
   processes on the same node and when you deploy the processes on
   different nodes. |service| also rebuilds indexes when you enable or
   disable :ref:`Encryption at Rest <security-kms-encryption>`.

   If you change the topology of your search deployment, {+fts+}
   provisions and builds indexes on any new nodes before removing old
   nodes, to ensure there is no query downtime. 

   For deployments where both the ``mongod`` and ``mongot`` processes
   run on the same node, if {+fts+} introduces changes that require
   rebuilding your indexes (such as some {+fts+} features that require
   an :ref:`index update <fts-index-rebuild>`), |service| automatically
   deploys additional nodes for free to build the indexes, while the old
   nodes continue to serve your queries.

   .. include:: /includes/shared/facts/fact-shardCollection-fts-indexes.rst

   .. include:: /includes/index/manage-indexes/facts/fact-fts-out-agg.rst

.. collapsible::
   :heading: Dedicated Search Nodes
   :sub_heading: How are {+fts+} indexes affected by dedicated Search Node architecture?
   :expanded: false

   You can deploy :ref:`dedicated Search Nodes <what-is-search-node>` to
   improve performance, scalability, and resource isolation.

   If you've deployed Search Nodes, consider the following:

   - Adding and adjusting :ref:`shards <sharding-background>` triggers a
     rebuild of the {+fts+} index. During this index rebuild, the index
     might not have the most current data. Therefore, queries against
     data on those shards might fail or return incorrect results.

   - If you :ref:`reshard <sharding-resharding>` a
     collection with {+fts+} indexes, {+fts+} indexes on the collection
     become unavailable when the resharding operation completes. You
     *must* manually rebuild the {+fts+} indexes once the operation
     completes.

   - If you issue the command to :manual:`change the primary shard
     </reference/command/movePrimary/>` of a database, the {+fts+}
     indexes for any unsharded collection under this database become
     unavailable once the operation completes. You *must* delete and
     create new {+fts+} indexes once the :dbcommand:`movePrimary`
     operation is complete.

   - .. include:: /includes/deployment/facts/fact-fcis.rst

   To learn more about {+fts+} node architecture, see
   :ref:`fts-deployment-options`. 

.. collapsible::
   :heading: Disk, Memory, and Resource Usage
   :sub_heading: How do {+fts+} indexes affect your available disk space and memory? 
   :expanded: false

   Although the data stored on {+fts+} isn't an identical copy of data from
   the collection on your |service| cluster, {+fts+} indexes still take
   some disk space and memory. If you enable the ``store`` option for
   fields that contain :ref:`string <bson-data-types-string>` values or if
   you configure the :ref:`stored source fields <fts-stored-source-definition>`
   in your index, {+fts+} stores an identical copy of the specified fields on
   disk, which can take disk space.

   .. important::
         
         .. include:: /includes/deployment/facts/fact-fts-document-size.rst

.. collapsible::
   :heading: Concurrent Requests Error
   :sub_heading: What happens if there are too many concurrent {+fts+} index management requests? 
   :expanded: false

   If there are too many concurrent index creation or other index management
   operation requests, {+fts+} returns the following error:  

   .. code-block:: shell

      Too many concurrent requests. Please try again later.

   We recommend trying again after some time.

.. collapsible::
   :heading: Quarantined Indexes
   :sub_heading: How {+fts+} handles an unparseable index definition
   :expanded: false

   If the ``mongot`` process cannot parse an index definition that
   it previously stored to disk, it quarantines the index. An index
   definition can become unparseable
   after a rollback to an earlier ``mongot`` version that is
   incompatible with the definition. Quarantine does not occur during
   standard version upgrades.

   A quarantined index does not serve queries, and queries against it
   return an error. You can still view, update, or delete a
   quarantined index. All other indexes continue to serve queries.
   {+fts+} reports a quarantined index with a ``FAILED`` status, and
   the index status details describe the parse error, prefixed with
   ``INIT_PARSE_FAILURE:``.

   On |service|, the {+atlas-ui+} displays the index with a
   :guilabel:`Failed` status and an error message, and |service|
   pauses rolling restarts on the cluster while an index is
   quarantined. For self-managed deployments, check the ``mongot``
   logs for the parse error.

   To recover a quarantined index, take one of the following actions:

   - Edit the index definition. {+fts+} rebuilds the index from the
     new definition. The index does not serve queries until the
     rebuild completes.

   - Delete the index.

   - Revert ``mongot`` to a version that is compatible with the
     index definition. ``mongot`` retains the quarantined index on
     disk, so the index resumes from its previous state without a
     rebuild. The index might not become queryable immediately if it
     was not queryable before the rollback or if it has fallen
     significantly behind.