.. _atlas-organizations-apiKeys-accessLists-list:

============================================
atlas organizations apiKeys accessLists list
============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return all IP access list entries for your API Key.

To view possible values for the apiKeyID argument, run atlas organizations apiKeys list.

To use this command, you must authenticate with a user account or an API key with the Organization Member role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas organizations apiKeys accessLists list <apiKeyID> [options]

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
   * - apiKeyID
     - string
     - true
     - Unique 24-digit string that identifies your API key.

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

Examples
--------

.. code-block::
   :copyable: false

   # Return a JSON-formatted list of access list entries for the API key with the ID 5f24084d8dbffa3ad3f21234 in the organization with the ID 5a1b39eec902201990f12345:
   atlas organizations apiKeys accessLists list --apiKey 5f24084d8dbffa3ad3f21234 --orgId 5a1b39eec902201990f12345 --output json
