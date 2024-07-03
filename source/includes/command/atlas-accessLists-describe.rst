.. _atlas-accessLists-describe:

==========================
atlas accessLists describe
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return the details for the specified IP access list entry.

To use this command, you must authenticate with a user account or an API key with the Organization Member role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas accessLists describe <entry> [options]

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
   * - entry
     - string
     - true
     - The IP address, CIDR address, or AWS security group ID of the access list entry to return.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     - 
     - false
     - help for describe
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.

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

   # Return the JSON-formatted details for the access list entry 192.0.2.0/24 in the project with ID 5e2211c17a3e5a48f5497de3:
   atlas accessLists describe 192.0.2.0/24 --output json --projectId 5e1234c17a3e5a48f5497de3
