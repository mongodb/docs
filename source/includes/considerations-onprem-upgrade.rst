.. admonition:: Advisories

   - MongoDB 2.6 is no longer allowed as a backing store. The |onprem|
     Application Database and all Blockstore Snapshot Stores must be
     upgraded to at least MongoDB 3.0.8 before attempting the upgrade
     to |onprem| 3.4.

   - As soon as the upgrade to |onprem| 3.4 is complete, the system
     will begin a background migration of all monitoring data to a new
     schema. This migration requires significant free disk space.
     Before upgrading to |onprem| 3.4 ensure that the data
     partitions for the |onprem| Application Database have at least
     50% free disk space.

- The Automation endpoints for the API are now whitelist protected.

- If you have modified the ``mms.conf`` file in your current
  installation (generally, not a customary practice), back up the file.
  You must use the new ``mms.conf`` file installed by the upgrade. You
  can reapply any modifications after completing the upgrade
