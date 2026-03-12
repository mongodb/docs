.. _atlas-api-organizations:

=======================
atlas api organizations
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, and edits organizational units in MongoDB Cloud.

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
     - help for organizations

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

* :ref:`atlas-api-organizations-createOrg` - Creates one organization in MongoDB Cloud and links it to the requesting Service Account's or API Key's organization.
* :ref:`atlas-api-organizations-deleteOrg` - Removes one specified organization.
* :ref:`atlas-api-organizations-getOrg` - Returns one organization to which the requesting Service Account or API Key has access.
* :ref:`atlas-api-organizations-getOrgGroups` - Returns multiple projects in the specified organization.
* :ref:`atlas-api-organizations-getOrgSettings` - Returns details about the specified organization's settings.
* :ref:`atlas-api-organizations-listOrgs` - Returns all organizations to which the requesting Service Account or API Key has access.
* :ref:`atlas-api-organizations-updateOrg` - Updates one organization.
* :ref:`atlas-api-organizations-updateOrgSettings` - Updates the organization's settings.


.. toctree::
   :titlesonly:

   createOrg </command/atlas-api-organizations-createOrg>
   deleteOrg </command/atlas-api-organizations-deleteOrg>
   getOrg </command/atlas-api-organizations-getOrg>
   getOrgGroups </command/atlas-api-organizations-getOrgGroups>
   getOrgSettings </command/atlas-api-organizations-getOrgSettings>
   listOrgs </command/atlas-api-organizations-listOrgs>
   updateOrg </command/atlas-api-organizations-updateOrg>
   updateOrgSettings </command/atlas-api-organizations-updateOrgSettings>
