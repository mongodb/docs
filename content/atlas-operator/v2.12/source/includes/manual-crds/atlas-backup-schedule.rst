.. _atlasbackupschedule: 

AtlasBackupSchedule
-------------------

AtlasBackupSchedule is the Schema for the atlasbackupschedules API.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - ``AtlasBackupSchedule``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasBackupScheduleSpec`` defines the target state of ``AtlasBackupSchedule``.
     - false

   * -  ``status``
     - object
     - ``BackupScheduleStatus`` defines the observed state of ``AtlasBackupSchedule``.
     - false

.. _atlasbackupschedule-spec: 

AtlasBackupSchedule.spec
~~~~~~~~~~~~~~~~~~~~~~~~

AtlasBackupScheduleSpec defines the target state of AtlasBackupSchedule.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``policy``
     - object
     - A reference (name & namespace) for backup ``policy`` in the desired updated backup policy.
     - true

   * -  ``autoExportEnabled``
     - boolean
     - Specify true to enable automatic export of cloud backup snapshots to the ``AWS`` bucket. You must also define the export policy using export. If omitted, defaults to false.
       *Default*: false
     - false

   * -  ``copySettings``
     - []object
     - Copy backups to other regions for increased resiliency and faster restores.
     - false

   * -  ``export``
     - object
     - Export policy for automatically exporting cloud backup snapshots to ``AWS`` bucket.
     - false

   * -  ``referenceHourOfDay``
     - integer
     - ``UTC`` Hour of day between 0 and 23, inclusive, representing which hour of the day that Atlas takes snapshots for backup policy items
       *Format*: int64
       *Minimum*: 0
       *Maximum*: 23
     - false

   * -  ``referenceMinuteOfHour``
     - integer
     - ``UTC`` Minutes after ``ReferenceHourOfDay`` that Atlas takes snapshots for backup policy items. Must be between 0 and 59, inclusive.
       *Format*: int64
       *Minimum*: 0
       *Maximum*: 59
     - false

   * -  ``restoreWindowDays``
     - integer
     - Number of days back in time you can restore to with Continuous Cloud Backup accuracy. Must be a positive, non-zero integer. Applies to continuous cloud backups only.
       *Format*: int64
       *Default*: 1
     - false

   * -  ``updateSnapshots``
     - boolean
     - Specify true to apply the retention changes in the updated backup policy to snapshots that Atlas took previously.
     - false

   * -  ``useOrgAndGroupNamesInExportPrefix``
     - boolean
     - Specify true to use organization and project names instead of organization and project UUIDs in the path for the metadata files that Atlas uploads to your ``S3`` bucket after it finishes exporting the snapshots
     - false

.. _atlasbackupschedule-spec-policy: 

AtlasBackupSchedule.spec.policy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference (name & namespace) for backup policy in the desired updated backup policy.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the Kubernetes Resource
     - true

   * -  ``namespace``
     - string
     - Namespace of the Kubernetes Resource
     - false

.. _atlasbackupschedule-spec-copysettings: 

AtlasBackupSchedule.spec.copySettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``cloudProvider``
     - enum
     - Identifies the cloud provider that stores the snapshot copy.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
       *Default*: ``AWS``
     - false

   * -  ``frequencies``
     - []string
     - List that describes which types of snapshots to copy.
     - false

   * -  ``regionName``
     - string
     - Target region to copy snapshots belonging to ``replicationSpecId`` to.
     - false

   * -  ``shouldCopyOplogs``
     - boolean
     - Flag that indicates whether to copy the oplogs to the target region.
     - false

.. _atlasbackupschedule-spec-export: 

AtlasBackupSchedule.spec.export
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Export policy for automatically exporting cloud backup snapshots to AWS bucket.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``exportBucketId``
     - string
     - Unique Atlas identifier of the ``AWS`` bucket which was granted access to export backup snapshot.
     - true

   * -  ``frequencyType``
     - enum
     - Human-readable label that indicates the rate at which the export policy item occurs.
       *Enum*: monthly
       *Default*: monthly
     - true

.. _atlasbackupschedule-status: 

AtlasBackupSchedule.status
~~~~~~~~~~~~~~~~~~~~~~~~~~

BackupScheduleStatus defines the observed state of AtlasBackupSchedule.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions is the list of statuses showing the current state of the Atlas Custom Resource
     - true

   * -  ``deploymentID``
     - []string
     - List of the human-readable names of all deployments utilizing this backup schedule.
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasbackupschedule-status-conditions: 

AtlasBackupSchedule.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition describes the state of an Atlas Custom Resource at a certain point.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition; one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of Atlas Custom Resource condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       Represented in ``ISO`` 8601 format.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A ``message`` providing details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false
