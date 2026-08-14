.. step:: Add an export policy to your {+Cloud-Backup+} schedule

   .. include:: /includes/backup/export-auto-policy-intro.rst

   To create an export policy, use the :atlascli:`atlas api
   cloudBackups updateBackupSchedule
   </command/atlas-api-cloudBackups-updateBackupSchedule/>` command and
   include the following fields in the request body file:

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

      To enable automatic export of snapshots with a ``monthly``
      frequency type, run the :atlascli:`atlas api cloudBackups
      updateBackupSchedule
      </command/atlas-api-cloudBackups-updateBackupSchedule/>`
      command with the following request body file:

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
