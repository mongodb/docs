The :guilabel:`{+fts+}` page in the {+atlas-ui+} displays a table of the
{+fts+} indexes for a cluster. The :guilabel:`Status` column displays
the status of the {+fts+} index on the primary node in the cluster.

Possible index statuses include:

.. include:: /includes/fts/list-tables/index-statuses.rst

To view index statuses for more nodes in your cluster, you can open the
:guilabel:`Status Details` page by clicking :guilabel:`View status
details` in the :guilabel:`Status` column. 

The :guilabel:`Status Details` page contains the following sections:

Index Serving Queries
~~~~~~~~~~~~~~~~~~~~~

This section displays the index that is being used to serve queries.

If you have only one version of the index with this name for the
collection, the section contains a link to the :guilabel:`Index
Overview` where you can see the index definition for the index being
used. 

If you had other indexes with the same name on the collection, the
section shows the latest index definition and also shows prior valid
versions of the index that you can copy in different tabs. 

When you update an index, different nodes apply the updates at different
speeds. Therefore, some nodes might use the latest version and some might
use the prior version. |service| displays both versions of the index
until the changes are applied to all the nodes. 

If you attempt to update the index with an invalid index definition, the 
index build will fail and |service| displays only the previous valid
index definition. 

Status Details by Node
~~~~~~~~~~~~~~~~~~~~~~

This section displays the status of the index on each node of the
{+cluster+}. You can see the following details about the index on each
node:

.. include:: /includes/fts/list-tables/status-details-by-node.rst

.. _search-node-migration-status:

Migration to Search Nodes
~~~~~~~~~~~~~~~~~~~~~~~~~

This section displays the status of the in-progress migration of your
{+fts+} and {+avs+} indexes to search nodes, if applicable. This section displays
only if you are currently migrating to search nodes.

Click the :guilabel:`View Migration Progress` link in the information
banner under the :guilabel:`Index Status by Search Node` section for 
details on the progress of the migration of the indexes to Search Nodes
(on a per node basis). 

The {+atlas-ui+} displays the following columns for each index on the
{+cluster+}.  

.. include:: /includes/fts/list-tables/node-migration-progress.rst 

The status column displays one of the following migration statuses of
the index on the Search Nodes: 

.. include:: /includes/fts/list-tables/search-node-migration-status.rst

Your queries can continue to use existing indexes while the new indexes
are building on the Search Nodes. The migration to the Search Nodes
completes only when |service| successfully builds all the indexes
on the Search Nodes. Then, your queries are automatically routed to
the use the indexes on the Search Nodes.