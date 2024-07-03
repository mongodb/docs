.. _atlas-teams-users-list:

======================
atlas teams users list
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return all users for a team.

To use this command, you must authenticate with a user account or an API key with the Organization Member role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas teams users list [options]

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
   * - -c, --compact
     - 
     - false
     - Flag that enables the compact array response structure for a json output. The --compact option returns array objects as top-level responses and allows backward compatibility for scripts based on previous CLI versions. Omitting the --compact option for a json output returns array objects within a 'results' sub-array. You must specify --output json to use this option.
   * - -h, --help
     - 
     - false
     - help for list
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --teamId
     - string
     - true
     - Unique 24-digit string that identifies the team.

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

   # Return a JSON-formatted list of the users for the team with the ID 5f6a5c6c713184005d72fe6e in the organization with ID 5e2211c17a3e5a48f5497de3:
   atlas teams users list --teamId 5f6a5c6c713184005d72fe6e --orgId 5e1234c17a3e5a48f5497de3 --output json
