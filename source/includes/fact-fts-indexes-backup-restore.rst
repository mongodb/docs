If the {+Cloud-Backup+} snapshot is restored to the same 
{+cluster+} as the source of the backup, |service| can restore |fts| 
:ref:`indexes <ref-index-definitions>` from the {+Cloud-Backup+} 
snapshot. Otherwise, you must manually :ref:`rebuild 
<ref-create-index>` |fts| indexes on the {+cluster+}.
