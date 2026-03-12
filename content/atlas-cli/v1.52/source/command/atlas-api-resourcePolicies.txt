.. _atlas-api-resourcePolicies:

==========================
atlas api resourcePolicies
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Configure and manage Atlas Resource Policies within your organization.

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
     - help for resourcePolicies

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

* :ref:`atlas-api-resourcePolicies-createOrgResourcePolicy` - Create one Atlas Resource Policy for an org.
* :ref:`atlas-api-resourcePolicies-deleteOrgResourcePolicy` - Delete one Atlas Resource Policy for an org.
* :ref:`atlas-api-resourcePolicies-getNonCompliantResources` - Return all non-compliant resources for an org.
* :ref:`atlas-api-resourcePolicies-getOrgResourcePolicy` - Return one Atlas Resource Policy for an org.
* :ref:`atlas-api-resourcePolicies-listOrgResourcePolicies` - Return all Atlas Resource Policies for the org.
* :ref:`atlas-api-resourcePolicies-updateOrgResourcePolicy` - Update one Atlas Resource Policy for an org.
* :ref:`atlas-api-resourcePolicies-validateResourcePolicies` - Validate one Atlas Resource Policy for an org.


.. toctree::
   :titlesonly:

   createOrgResourcePolicy </command/atlas-api-resourcePolicies-createOrgResourcePolicy>
   deleteOrgResourcePolicy </command/atlas-api-resourcePolicies-deleteOrgResourcePolicy>
   getNonCompliantResources </command/atlas-api-resourcePolicies-getNonCompliantResources>
   getOrgResourcePolicy </command/atlas-api-resourcePolicies-getOrgResourcePolicy>
   listOrgResourcePolicies </command/atlas-api-resourcePolicies-listOrgResourcePolicies>
   updateOrgResourcePolicy </command/atlas-api-resourcePolicies-updateOrgResourcePolicy>
   validateResourcePolicies </command/atlas-api-resourcePolicies-validateResourcePolicies>
