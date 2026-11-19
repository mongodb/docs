.. _atlas-api-customDatabaseRoles:

=============================
atlas api customDatabaseRoles
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes custom database user privilege roles.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Use custom roles to specify custom sets of actions that the MongoDB Cloud built-in roles can't describe. You define custom roles at the project level, for all clusters in the project. This resource supports a subset of MongoDB privilege actions. You can create a subset of custom role actions. To create a wider list of custom role actions, use the MongoDB Cloud user interface. Custom roles must include actions that all project's clusters support, and that are compatible with each MongoDB version that your project's clusters use. For example, if your project has MongoDB 4.2 clusters, you can't create custom roles that use actions introduced in MongoDB 4.4.

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
     - help for customDatabaseRoles

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

* :ref:`atlas-api-customDatabaseRoles-createCustomDbRole` - Creates one custom role in the specified project.
* :ref:`atlas-api-customDatabaseRoles-deleteCustomDbRole` - Removes one custom role from the specified project.
* :ref:`atlas-api-customDatabaseRoles-getCustomDbRole` - Returns one custom role for the specified project.
* :ref:`atlas-api-customDatabaseRoles-listCustomDbRoles` - Returns all custom roles for the specified project.
* :ref:`atlas-api-customDatabaseRoles-updateCustomDbRole` - Updates one custom role in the specified project.


.. toctree::
   :titlesonly:

   createCustomDbRole </command/atlas-api-customDatabaseRoles-createCustomDbRole>
   deleteCustomDbRole </command/atlas-api-customDatabaseRoles-deleteCustomDbRole>
   getCustomDbRole </command/atlas-api-customDatabaseRoles-getCustomDbRole>
   listCustomDbRoles </command/atlas-api-customDatabaseRoles-listCustomDbRoles>
   updateCustomDbRole </command/atlas-api-customDatabaseRoles-updateCustomDbRole>
