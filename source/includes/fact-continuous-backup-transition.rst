As of MongoDB version 4.2, :ref:`Continuous Backups <backup-continuous>`
are deprecated in favor of :ref:`Cloud Provider Snapshots <backup-cloud-provider>`.
When you upgrade from 4.0 to 4.2, your backup system upgrades to |cps| if it
is currently set to continuous backup. After this upgrade:

- All your existing continuous backup snapshots remain available. They
  expire over time in accordance with your :ref:`retention policy
  <retention-policy>`.

- Your :ref:`backup policy <cloud-provider-retention-policy>` resets to
  the :ref:`default schedule <cloud-provider-backup-schedule>`. If you had 
  a custom backup policy in place with continuous backups, you must re-create
  it with the procedure outlined in the :ref:`Cloud Provider Snapshot
  documentation <cloud-provider-backup-schedule>`.
