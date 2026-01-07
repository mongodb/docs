.. _atlasbackupcompliancepolicy: 

AtlasBackupCompliancePolicy
---------------------------

The AtlasBackupCompliancePolicy is a configuration that enforces specific backup and retention requirements

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
     - ``AtlasBackupCompliancePolicy``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasBackupCompliancePolicySpec`` is the specification of the desired configuration of backup compliance policy
     - false

   * -  ``status``
     - object
     -  
     - false

.. _atlasbackupcompliancepolicy-spec: 

AtlasBackupCompliancePolicy.spec
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasBackupCompliancePolicySpec is the specification of the desired configuration of backup compliance policy

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``authorizedEmail``
     - string
     - Email address of the user who authorized to update the Backup Compliance Policy settings.
     - true

   * -  ``authorizedUserFirstName``
     - string
     - First name of the user who authorized to updated the Backup Compliance Policy settings.
     - true

   * -  ``authorizedUserLastName``
     - string
     - Last name of the user who authorized to updated the Backup Compliance Policy settings.
     - true

   * -  ``copyProtectionEnabled``
     - boolean
     - Flag that indicates whether to prevent cluster users from deleting backups copied to other regions, even if those additional snapshot regions are removed.
     - false

   * -  ``encryptionAtRestEnabled``
     - boolean
     - Flag that indicates whether Encryption at Rest using Customer Key Management is required for all clusters with a Backup Compliance Policy.
     - false

   * -  ``onDemandPolicy``
     - object
     - Specifications for on-demand policy.
     - false

   * -  ``overwriteBackupPolicies``
     - boolean
     - Flag that indicates whether to overwrite non-complying backup policies with the new data protection settings or not.
     - false

   * -  ``pointInTimeEnabled``
     - boolean
     - Flag that indicates whether the cluster uses Continuous Cloud Backups with a Backup Compliance Policy.
     - false

   * -  ``restoreWindowDays``
     - integer
     - Number of previous days that you can restore back to with Continuous Cloud Backup with a Backup Compliance Policy. This parameter applies only to Continuous Cloud Backups with a Backup Compliance Policy.
     - false

   * -  ``scheduledPolicyItems``
     - []object
     - List that contains the specifications for one scheduled policy.
     - false

.. _atlasbackupcompliancepolicy-spec-ondemandpolicy: 

AtlasBackupCompliancePolicy.spec.onDemandPolicy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specifications for on-demand policy.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``retentionUnit``
     - enum
     - Scope of the backup policy item: days, weeks, or months.
       *Enum*: days, weeks, months
     - true

   * -  ``retentionValue``
     - integer
     - Value to associate with ``RetentionUnit``.
     - true

.. _atlasbackupcompliancepolicy-spec-scheduledpolicyitems: 

AtlasBackupCompliancePolicy.spec.scheduledPolicyItems
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``frequencyInterval``
     - integer
     - Desired frequency of the new backup policy item specified by ``FrequencyType``. A value of 1 specifies the first instance of the corresponding ``FrequencyType``.
       The only accepted value you can set for frequency interval with NVMe clusters is 12.
       *Enum*: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 40
     - true

   * -  ``frequencyType``
     - enum
     - Frequency associated with the backup policy item. You cannot specify multiple hourly and daily backup policy items.
       *Enum*: hourly, daily, weekly, monthly, yearly
     - true

   * -  ``retentionUnit``
     - enum
     - Unit of time in which ``MongoDB`` Atlas measures snapshot retention.
       *Enum*: days, weeks, months, years
     - true

   * -  ``retentionValue``
     - integer
     - Duration in days, weeks, months, or years that ``MongoDB`` Cloud retains the snapshot.
       For less frequent policy items, ``MongoDB`` Cloud requires that you specify a value greater than or equal to the value specified for more frequent policy items.
     - true

.. _atlasbackupcompliancepolicy-status: 

AtlasBackupCompliancePolicy.status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasbackupcompliancepolicy-status-conditions: 

AtlasBackupCompliancePolicy.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
     - Status of the condition, one of True, False, Unknown.
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
     - A human readable ``message`` indicating details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false
