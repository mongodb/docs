.. _atlas-federatedAuthentication-federationSettings-connectedOrgConfigs-update:

===========================================================================
atlas federatedAuthentication federationSettings connectedOrgConfigs update
===========================================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Update One Org Config Connected to One Federation Setting.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas federatedAuthentication federationSettings connectedOrgConfigs update [options]

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
   * - --federationSettingsId
     - string
     - true
     - Unique 24-hexadecimal digit string that identifies the federation settings.
   * - --file
     - string
     - true
     - Path to a JSON configuration file that defines connected orgs configurations. Note: Unsupported fields in the JSON file are ignored. To learn more about connected org configuration file format, see the request body in https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Federated-Authentication/operation/updateConnectedOrgConfig.
   * - -h, --help
     - 
     - false
     - help for update
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.

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

   # Update the connected orgs config with the current profile org and federationSettingsId 5d1113b25a115342acc2d1aa using the JSON configuration file config.json
 			atlas federatedAuthentication federationSettings connectedOrgConfigs update --federationSettingsId 5d1113b25a115342acc2d1aa --file config.json
 		
