.. _atlas-api-auditing:

==================
atlas api auditing
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and edits database auditing settings for MongoDB Cloud projects.

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
     - help for auditing

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

* :ref:`atlas-api-auditing-getGroupAuditLog` - Returns the auditing configuration for the specified project.
* :ref:`atlas-api-auditing-updateAuditLog` - Updates the auditing configuration for the specified project.


.. toctree::
   :titlesonly:

   getGroupAuditLog </command/atlas-api-auditing-getGroupAuditLog>
   updateAuditLog </command/atlas-api-auditing-updateAuditLog>
