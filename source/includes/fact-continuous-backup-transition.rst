As of MongoDB version 4.2, :ref:`{+Old-Backup+}s <legacy-backup>`
are deprecated in favor of :ref:`{+Cloud-Backup+}s <backup-cloud-provider>`.
When you upgrade from 4.0 to 4.2, your backup system upgrades to {+cloud-backup+} if it
is currently set to {+old-backup+}. After this upgrade:

- All your existing {+old-backup+} snapshots remain available. They
  expire over time in accordance with your :ref:`retention policy
  <retention-policy>`.

- Your :ref:`backup policy <cloud-provider-retention-policy>` resets to
  the :ref:`default schedule <cloud-provider-backup-schedule>`. If you
  had a custom backup policy in place with {+old-backup+}s, you must
  re-create it with the procedure outlined in the
  :ref:`{+Cloud-Backup+} documentation <cloud-provider-backup-schedule>`.
