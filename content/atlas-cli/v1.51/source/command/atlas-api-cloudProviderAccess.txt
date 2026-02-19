.. _atlas-api-cloudProviderAccess:

=============================
atlas api cloudProviderAccess
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, authorizes, and removes AWS IAM roles in Atlas.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.



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
     - help for cloudProviderAccess

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

Related Commands
----------------

* :ref:`atlas-api-cloudProviderAccess-authorizeProviderAccessRole` - Grants access to the specified project for the specified access role.
* :ref:`atlas-api-cloudProviderAccess-createCloudProviderAccess` - Creates one access role for the specified cloud provider.
* :ref:`atlas-api-cloudProviderAccess-deauthorizeProviderAccessRole` - Revokes access to the specified project for the specified access role.
* :ref:`atlas-api-cloudProviderAccess-getCloudProviderAccess` - Returns the access role with the specified id and with access to the specified project.
* :ref:`atlas-api-cloudProviderAccess-listCloudProviderAccess` - Returns all cloud provider access roles with access to the specified project.


.. toctree::
   :titlesonly:

   authorizeProviderAccessRole </command/atlas-api-cloudProviderAccess-authorizeProviderAccessRole>
   createCloudProviderAccess </command/atlas-api-cloudProviderAccess-createCloudProviderAccess>
   deauthorizeProviderAccessRole </command/atlas-api-cloudProviderAccess-deauthorizeProviderAccessRole>
   getCloudProviderAccess </command/atlas-api-cloudProviderAccess-getCloudProviderAccess>
   listCloudProviderAccess </command/atlas-api-cloudProviderAccess-listCloudProviderAccess>
