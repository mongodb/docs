.. _atlas-backups-compliancePolicy-policies-scheduled-create:

========================================================
atlas backups compliancePolicy policies scheduled create
========================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a scheduled policy item for the backup compliance policy for your project.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas backups compliancePolicy policies scheduled create [options]

.. Code end marker, please don't delete this comment

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --frequencyInterval
     - int
     - true
     - Number that indicates the frequency interval for a set of snapshots. A value of 1 specifies the first instance of the corresponding frequencyType. In a monthly policy item, 1 indicates that the monthly snapshot occurs on the first day of the month and 40 indicates the last day of the month. In a weekly policy item, 1 indicates that the weekly snapshot occurs on Monday and 7 indicates Sunday. In an hourly policy item, you can set the frequency interval to 1, 2, 4, 6, 8, or 12. For hourly policy items for NVMe clusters, Atlas accepts only 12 as the frequency interval value.
   * - --frequencyType
     - string
     - true
     - Frequency type associated with the backup policy: 'daily', 'hourly', 'monthly', 'weekly'.
   * - -h, --help
     - 
     - false
     - help for create
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --retentionUnit
     - string
     - true
     - Unit of time in which Atlas measures snapshot retention: 'days' 'weeks' 'months'. 
   * - --retentionValue
     - int
     - true
     - Duration in days, weeks, or months that Atlas retains the snapshot. For less frequent policy items, Atlas requires that you specify a value greater than or equal to the value specified for more frequent policy items.
   * - -w, --watch
     - 
     - false
     - Flag that indicates whether to watch the command until it completes its execution or the watch times out.

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Examples
--------

.. code-block::
   :copyable: false

   # Create a backup compliance schedule policy with a weekly frequency, where the snapshot occurs on Monday and has a retention of two months:
   atlas backups compliancepolicy policies scheduled create --frequencyType weekly --frequencyInterval 1 --retentionUnit months --retentionValue 2
