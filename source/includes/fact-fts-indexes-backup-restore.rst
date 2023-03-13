|service| can restore |fts| 
:ref:`indexes <ref-index-definitions>` from a {+Cloud-Backup+} 
snapshot only if both of the following are true:

- You restore the {+Cloud-Backup+} snapshot to the same 
  {+cluster+} as the source of the backup. 
- The |fts| index exists in the {+cluster+} at the time of restoration.
  If you delete the |fts| index after the snapshot but before the
  restoration, |service| can't restore the |fts| index from the
  snapshot.

Otherwise, you must manually :ref:`rebuild 
<ref-create-index>` |fts| indexes on the {+cluster+}.
