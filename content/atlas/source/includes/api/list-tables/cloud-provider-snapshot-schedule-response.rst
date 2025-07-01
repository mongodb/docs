.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``autoExportEnabled`` 
     - boolean 
     - Flag that indicates whether automatic export of cloud backup 
       snapshots to the |aws| bucket is enabled. Value can be one 
       of the following: 

       - ``true`` - enables automatic export of cloud backup snapshots 
         to the |aws| bucket
       - ``false`` - disables automatic export of cloud backup 
         snapshots to the |aws| bucket (default)

   * - ``clusterId``
     - string
     - Unique identifier of the |service| cluster.

   * - ``clusterName``
     - string
     - Name of the |service| cluster.

   * - ``export``
     - document 
     - Export policy for automatically exporting cloud backup snapshots 
       to |aws| bucket. 

   * - ``export.exportBucketId``
     - string
     - Unique identifier of the |aws| bucket to export the cloud backup 
       snapshot to. 

   * - ``export.frequencyType``
     - string 
     - Frequency associated with the export policy. Value can be 
       ``daily``, ``weekly``, or ``monthly``.

   * - ``links``
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - ``nextSnapshot``
     - string
     - |Epoch-time| when |service| takes the next snapshot.

   * - ``policies[]``
     - array
     - Unique identifier for the snapshot and an array of
       backup policy items.

   * - | ``policies[i]``
       | ``.id``
     - string
     - Unique identifier of the backup policy.

   * - | ``policies[i]``
       | ``.policyItems[]``
     - array
     - Array of backup policy items.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.frequencyInterval``
     - number
     - Desired frequency of the new backup policy item specified
       by ``frequencyType``.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.frequencyType``
     - string
     - Frequency associated with the backup policy item. One of the
       following values: ``hourly``, ``daily``, ``weekly`` or
       ``monthly``.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.id``
     - string
     - Unique identifier of the backup policy item.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.retentionUnit``
     - string
     - Metric of duration of the backup policy item: ``days``,
       ``weeks``, or ``months``.

   * - | ``policies[i]``
       | ``.policyItems[n]``
       | ``.retentionValue``
     - number
     - Duration for which the backup is kept. Associated with
       ``retentionUnit``.

   * - ``referenceHourOfDay``
     - number
     - |utc| Hour of day between ``0`` and ``23`` representing which
       hour of the day that |service| takes a snapshot.

   * - ``referenceMinuteOfHour``
     - number
     - |utc| Minute of day between ``0`` and ``59`` representing which
       minute of the ``referenceHourOfDay`` that |service| takes the
       snapshot.

   * - ``restoreWindowDays``
     - number
     - Number of days back in time you can restore to with
       {+PIT-Restore+} accuracy. Must be a positive, non-zero integer.

       Applies to {+pit-restore+}s only.

   * - ``updateSnapshots``
     - boolean
     - Flag indicating if updates to retention in the backup policy
       were applied to snapshots that |service| took earlier. If set to
       ``true``, the retention changes were applied to earlier
       snapshots.

   * - ``useOrgAndGroupNamesInExportPrefix``
     - boolean
     - Specifies whether to use organization and project names instead 
       of organization and project UUIDs in the path to the metadata 
       files that |service| uploads to your |s3| bucket after it 
       finishes exporting the snapshots. Value can be one of the 
       following: 

       - ``true`` - to use organization and project names
       - ``false`` - to use organization and project UUIDs (default)
