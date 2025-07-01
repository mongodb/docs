For ``M10+`` {+dedicated-clusters+},
|service| restores |fts| :ref:`index definitions <ref-index-definitions>` 
from a {+Cloud-Backup+} snapshot. |service| doesn't restore search
index data, so the ``mongot`` processes perform :ref:`initial syncs 
<replica-set-initial-sync>` for all restored search index definitions.
If you've defined large search indexes on your {+cluster+}, you might 
experience delays during snapshot restorations.
