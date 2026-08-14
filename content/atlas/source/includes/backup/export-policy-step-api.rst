.. step:: Add an export policy to your {+Cloud-Backup+} schedule

   .. include:: /includes/backup/export-auto-policy-intro.rst

   To create an export policy, send a ``PATCH`` request to the
   {+Cloud-Backup+} :oas-bump-atlas-op:`Update Group Cluster Backup
   Schedule <updategroupclusterbackupschedule>` endpoint and include
   the following fields in the request body:

   .. include:: /includes/backup/export-auto-policy-fields.rst

   .. example::

      Consider the following :ref:`{+Cloud-Backup+} policy
      <configure-backup-policy>` that sets a weekly and monthly
      snapshot schedule:

      .. list-table::
         :header-rows: 1
         :widths: 25 25 25 25

         * - Frequency Unit
           - Every
           - Retention Time
           - Snapshot Time

         * - Weekly
           - Sunday
           - 12:30 UTC
           - 7 days

         * - Monthly
           - Last day of month
           - 12:30 UTC
           - 6 weeks

      This policy takes a snapshot every Sunday and on the last day
      of each month. If the last day of the month falls on a Sunday,
      the policy takes one snapshot for that day.

      To enable automatic export of snapshots with a ``monthly``
      frequency type, send a ``PATCH`` request to the
      {+Cloud-Backup+} :oas-bump-atlas-op:`Update Group Cluster
      Backup Schedule <updategroupclusterbackupschedule>` endpoint
      with the following request body:

      .. code-block:: json
         :caption: export-policy-payload.json

         {
           "autoExportEnabled": true,
           "export": {
             "exportBucketId": "32b6e34b3d91647abb20e7b8",
             "frequencyType": "monthly"
            }
         }

      With this setup, {+service+} exports the snapshot that is taken
      on the last day of each month because its frequency type
      matches the ``export`` frequency type.
