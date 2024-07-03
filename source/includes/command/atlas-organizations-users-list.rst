.. _atlas-organizations-users-list:

==============================
atlas organizations users list
==============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return all users for an organization.

To use this command, you must authenticate with a user account or an API key with the Organization Member role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas organizations users list [options]

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
   * - -h, --help
     - 
     - false
     - help for list
   * - --limit
     - int
     - false
     - Number of items per results page, up to a maximum of 500. If you have more than 500 results, specify the --page option to change the results page. This value defaults to 100.
   * - --omitCount
     - 
     - false
     - Flag that indicates whether the JSON response returns the total number of items (totalCount) in the JSON response.
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --page
     - int
     - false
     - Page number that specifies a page of results. This value defaults to 1.

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

   ID     FIRST NAME    LAST NAME    USERNAME
   <Id>   <FirstName>   <LastName>   <Username>
   

Examples
--------

.. code-block::
   :copyable: false

   # Return a JSON-formatted list of all users for the organization with the ID 5e2211c17a3e5a48f5497de3:
   atlas organizations users list --orgId 5e2211c17a3e5a48f5497de3 --output json
