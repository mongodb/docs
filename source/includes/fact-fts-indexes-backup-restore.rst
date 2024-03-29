For ``M10+`` {+dedicated-clusters+} running MongoDB 4.2 or higher,
|service| will restore |fts| :ref:`index definitions <ref-index-definitions>` 
from a {+Cloud-Backup+} snapshot. |service| doesn't restore the 
index data, so the ``mongot`` processes perform :ref:`initial syncs 
<replica-set-initial-sync>` for all restored index definitions.
If you've defined large search indexes on your {+cluster+}, you might 
experience delays during snapshot restorations.
