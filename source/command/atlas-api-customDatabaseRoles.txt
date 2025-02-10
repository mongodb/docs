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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes custom database user privilege roles.

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

* :ref:`atlas-api-customDatabaseRoles-createCustomDatabaseRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one custom role in the specified project.
* :ref:`atlas-api-customDatabaseRoles-deleteCustomDatabaseRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one custom role from the specified project.
* :ref:`atlas-api-customDatabaseRoles-getCustomDatabaseRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one custom role for the specified project.
* :ref:`atlas-api-customDatabaseRoles-listCustomDatabaseRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all custom roles for the specified project.
* :ref:`atlas-api-customDatabaseRoles-updateCustomDatabaseRole` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one custom role in the specified project.


.. toctree::
   :titlesonly:

   createCustomDatabaseRole </command/atlas-api-customDatabaseRoles-createCustomDatabaseRole>
   deleteCustomDatabaseRole </command/atlas-api-customDatabaseRoles-deleteCustomDatabaseRole>
   getCustomDatabaseRole </command/atlas-api-customDatabaseRoles-getCustomDatabaseRole>
   listCustomDatabaseRoles </command/atlas-api-customDatabaseRoles-listCustomDatabaseRoles>
   updateCustomDatabaseRole </command/atlas-api-customDatabaseRoles-updateCustomDatabaseRole>

