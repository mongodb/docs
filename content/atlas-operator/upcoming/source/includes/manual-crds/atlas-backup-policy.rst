.. _atlasbackuppolicy: 

AtlasBackupPolicy
-----------------

AtlasBackupPolicy is the Schema for the atlasbackuppolicies API

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
     - ``AtlasBackupPolicy``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasBackupPolicySpec`` defines the desired state of ``AtlasBackupPolicy``
     - false

   * -  ``status``
     - object
     -  
     - false

.. _atlasbackuppolicy-spec: 

AtlasBackupPolicy.spec
~~~~~~~~~~~~~~~~~~~~~~

AtlasBackupPolicySpec defines the desired state of AtlasBackupPolicy

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``items``
     - []object
     - A list of ``BackupPolicy`` items.
     - true

.. _atlasbackuppolicy-spec-items: 

AtlasBackupPolicy.spec.items
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasbackuppolicy-status: 

AtlasBackupPolicy.status
~~~~~~~~~~~~~~~~~~~~~~~~

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

   * -  ``backupScheduleIDs``
     - []string
     - ``DeploymentID`` of the deployment using the backup policy
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasbackuppolicy-status-conditions: 

AtlasBackupPolicy.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
