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
     - Frequency associated with the export policy. Value must be  
       ``monthly``.

   * - ``links``
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - ``nextSnapshot``
     - string
     - |utc| `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       formatted point in time when |service| will take the next
       snapshot.

   * - ``policies``
     - array of objects
     - A list of policy definitions for the cluster.

   * - ``policies.id``
     - string
     - Unique identifier of the backup policy.

   * - ``policies.policyItems``
     - array of objects
     - A list of specifications for a policy.

   * - ``policies.policyItems.frequencyInterval``
     - number
     - The frequency interval for a set of snapshots.

   * - ``policies.policyItems.frequencyType``
     - string
     - A type of frequency. Possible values are:
       
       - hourly
       - daily
       - weekly
       - monthly

   * - ``id``
     - string
     - Unique identifier for this policy item.

   * - ``policies.policyItems.retentionUnit``
     - string
     - The unit of time in which snapshot retention is measured. Possible
       values are:

       - days
       - weeks
       - months

   * - ``policies.policyItems.retentionValue``
     - number
     - The number of days, weeks, or months the snapshot is retained.

   * - ``restoreWindowDays``
     - number
     - Specifies a restore window in days for the cloud provider backup
       to maintain.

   * - ``referenceHourOfDay``
     - number
     - |utc| Hour of day between ``0`` and ``23`` representing which
       hour of the day that |service| takes a snapshot.

   * - ``referenceMinuteOfHour``
     - number
     - |utc| Minute of day between ``0`` and ``59`` representing which
       minute of the ``referenceHourOfDay`` that |service| takes the
       snapshot.

   * - ``useOrgAndGroupNamesInExportPrefix``
     - boolean
     - Specifies whether to use organization and project names instead 
       of organization and project UUIDs in the path to the metadata 
       files that |service| uploads to your |s3| bucket after it 
       finishes exporting the snapshots. Value can be one of the 
       following: 

       - ``true`` - to use organization and project names
       - ``false`` - to use organization and project UUIDs (default)
