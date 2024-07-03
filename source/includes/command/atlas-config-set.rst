.. _atlas-config-set:

================
atlas config set
================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Configure specific properties of a profile.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas config set <propertyName> <value> [options]

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
   * - propertyName
     - string
     - true
     - Property to set in the profile. Valid values for Atlas CLI and MongoDB CLI are project_id, org_id, service, public_api_key, private_api_key, output, mongosh_path, skip_update_check, telemetry_enabled, access_token, and refresh_token. Additionally, values that are only valid for MongoDB CLI include ops_manager_url base_url, ops_manager_ca_certificate, and ops_manager_skip_verify.
   * - value
     - string
     - true
     - Value for the property to set in the profile.

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
     - help for set

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

  
   Set the organization ID in the default profile to 5dd5aaef7a3e5a6c5bd12de4:
   atlas config set org_id 5dd5aaef7a3e5a6c5bd12de4
