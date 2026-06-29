.. SHARED FILE: This file is a copy of
   content/atlas/source/includes/shared/facts/fact-fts-avs-java-21-upgrade.rst
   Any changes here must also be applied to the source file.

.. note::

   |service| reindexes all of your existing |fts| indexes on the
   |service| cluster in a rolling manner. The {+atlas-ui+} displays alerts 
   indicating the timing of your reindexing.
   Clusters not using separate search nodes might notice a temporary
   increase in disk and CPU utilization during reindexing. For
   clusters using separate search nodes, |service| temporarily
   deploys additional nodes for free for reindexing to avoid downtime
   for swapping of indexes when the new index build completes.
