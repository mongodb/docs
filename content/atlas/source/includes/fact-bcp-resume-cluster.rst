If you have a :ref:`{+bcp+} enabled <backup-compliance-policy>`, when 
you resume a {+cluster+}, |service| automatically enables 
{+Cloud-Backup+}. If the {+bcp+} has the 
:guilabel:`Require Point in Time Restore to all clusters` option 
set to :guilabel:`On`, |service| automatically enables 
{+PIT-Restore+} and adjusts the restore window according to the 
{+bcp+}. |service| automatically modifies the backup to meet the 
minimum requirements of the {+bcp+}.

If you deployed Search Nodes separately, |service| rebuilds the |fts| 
indexes to restore the data on the Search Nodes that it deleted when you 
paused the |service| {+cluster+}.
