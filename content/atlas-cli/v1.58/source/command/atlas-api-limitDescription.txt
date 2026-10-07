.. _atlas-api-limitDescription:

==========================
atlas api limitDescription
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns User-Configurable Project Limits.

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
     - help for limitDescription

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

* :ref:`atlas-api-limitDescription-getDefaultGroupLimit` - Returns the description of one user-configurable, project-level limit, along with its default and maximum values.
* :ref:`atlas-api-limitDescription-listDefaultGroupLimits` - Returns a list of all user-configurable, project-level limits, along with a description and their default and maximum values.


.. toctree::
   :titlesonly:

   getDefaultGroupLimit </command/atlas-api-limitDescription-getDefaultGroupLimit>
   listDefaultGroupLimits </command/atlas-api-limitDescription-listDefaultGroupLimits>
