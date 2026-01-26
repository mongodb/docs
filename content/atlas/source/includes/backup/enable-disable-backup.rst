To enable {+Cloud-Backup+} for an ``M10+`` |service| {+cluster+}, set
the :guilabel:`Turn on {+Cloud-Backup+}` toggle to :guilabel:`On`. When
enabled, |service| takes snapshots of your databases at regular
intervals and retains them according to your project's :ref:`backup
policy <cloud-provider-retention-policy>`.

To disable {+Cloud-Backup+} for an ``M10+`` |service| cluster, set the
:guilabel:`Turn on {+Cloud-Backup+}` toggle to :guilabel:`Off`. This
also disables {+PIT-Restore+} for the cluster. To retain any existing
snapshots after {+Cloud-Backup+} is disabled, set the :guilabel:`Keep
existing snapshots after backups disabled?` toggle to :guilabel:`On`
before you apply your changes to the cluster. This option instructs
{+service+} to retain the existing snapshots and :term:`oplog` for the
cluster according to your cluster's :ref:`backup policy
<configure-backup-policy>`.