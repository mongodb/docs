.. _atlas-alerts-acknowledge:

========================
atlas alerts acknowledge
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Acknowledges the specified alert for your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas alerts acknowledge <alertId> [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - alertId
     - string
     - true
     - ID of the alert you want to acknowledge or unacknowledge.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --comment
     - string
     - false
     - Optional description or comment for the entry.
   * - -F, --forever
     - 
     - false
     - Option that acknowledges an alert 'forever'. You can't set both the forever option and the until option in the same command.
   * - -h, --help
     - 
     - false
     - help for acknowledge
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --until
     - string
     - false
     - ISO 8601-formatted time until which the alert is acknowledged. This command returns this value if a MongoDB user previously acknowledged the alert. After this date, the alert becomes unacknowledged.

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

   Alert '<Id>' acknowledged until <AcknowledgedUntil>
   

Examples
--------

.. code-block::
   :copyable: false

   # Acknowledge an alert with the ID 5d1113b25a115342acc2d1aa in the project with the ID 5e2211c17a3e5a48f5497de3 until January 1 2028:
   atlas alerts acknowledge 5d1113b25a115342acc2d1aa --until 2028-01-01T20:24:26Z --projectId 5e2211c17a3e5a48f5497de3 --output json
