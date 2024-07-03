.. _atlas-maintenanceWindows-update:

===============================
atlas maintenanceWindows update
===============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Modify the maintenance window for your project.

To learn more about maintenance windows, see https://www.mongodb.com/docs/atlas/tutorial/cluster-maintenance-window/.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas maintenanceWindows update [options]

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
   * - --dayOfWeek
     - int
     - false
     - Day of the week that you want the maintenance window to start, as a 1-based integer. Use 1 for Sunday, 2 for Monday, 3 for Tuesday, 4 for Wednesday, 5 for Thursday, 6 for Friday, or 7 for Saturday.
   * - -h, --help
     - 
     - false
     - help for update
   * - --hourOfDay
     - int
     - false
     - Hour of the day that you want the maintenance window to start according to a 24-hour clock. Use 0 for midnight and 12 for noon.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --startASAP
     - 
     - false
     - Flag that starts maintenance immediately upon receiving this request. This flag resets to false after Atlas completes maintenance.

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

Output
------

If the command succeeds, the CLI returns output similar to the following sample. Values in brackets represent your values.

.. code-block::

   Maintenance window updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # Update the maintenance window to midnight on Saturdays for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas maintenanceWindows update --dayOfWeek 7 --hourOfDay 0 --projectId 5e2211c17a3e5a48f5497de3 --output json
