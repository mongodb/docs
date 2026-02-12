This example snapshot copy policy distributes copies of snapshots taken
for the following backup policy: 

**Backup Policy:**

This example :ref:`backup policy <configure-backup-policy>` takes
hourly, daily, and weekly snapshots and stores them in the same region
as the cluster's primary node. 

.. list-table::
   :widths: 15 10 10 10
   :header-rows: 1

   * - Frequency Unit
     - Every
     - Retention Time
     - Snapshot Time

   * - Hourly Snapshot
     - 6 hours
     - 2 days
     - 18:30 UTC

   * - Daily Snapshot
     - N/A
     - 7 days
     - 18:30 UTC

   * - Weekly Snapshot
     - Monday
     - 4 weeks
     - 18:30 UTC

   * - Weekly Snapshot
     - Friday
     - 4 weeks
     - 18:30 UTC

**Snapshot Copy Policy:**

This snapshot copy policy copies daily and hourly snapshots to the |aws|
region ``us-east-2`` (Ohio), and copies all weekly snapshots to
``us-west-1`` (N. California). It retains each snapshot copy in the copy
regions for the specified retention time, and copies oplogs to the
``us-east-2`` region to enable |pit| restores. 

.. list-table::
   :widths: 15 10 10 10
   :header-rows: 1

   * - Region
     - Snapshots
     - Retention Time
     - Point in Time Restore

   * - ``us-east-2`` (Copy)
     - Hourly
     - 12 hours
     - Enabled

   * - ``us-east-2`` (Copy)
     - Daily
     - 7 days
     - Enabled

   * - ``us-west-1`` (Copy)
     - Weekly
     - 7 days
     - Disabled