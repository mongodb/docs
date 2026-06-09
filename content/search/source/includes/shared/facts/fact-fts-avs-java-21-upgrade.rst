.. SHARED FILE: This file is a copy of
   content/atlas/source/includes/shared/facts/fact-fts-avs-java-21-upgrade.rst
   Any changes here must also be applied to the source file.

.. note::

   |service| will reindex all of your existing |fts| indexes on the
   |service| cluster in a rolling manner. The {+atlas-ui+} will
   display alerts that indicate the timing of your reindexing.
   clusters not using separate search nodes might notice a temporary
   increase in disk and CPU utilization during reindexing. For
   clusters using separate search nodes, |service| will temporarily
   deploy additional nodes for free for reindexing and there will be no downtime
   for swapping of indexes when the new index build completes.
