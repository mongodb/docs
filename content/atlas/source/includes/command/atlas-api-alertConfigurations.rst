.. _atlas-api-alertConfigurations:

=============================
atlas api alertConfigurations
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and edits the conditions that trigger alerts and how MongoDB Cloud notifies users.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

This collection remains under revision and may change.

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
     - help for alertConfigurations

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

* :ref:`atlas-api-alertConfigurations-createAlertConfig` - Creates one alert configuration for the specified project.
* :ref:`atlas-api-alertConfigurations-deleteAlertConfig` - Removes one alert configuration from the specified project.
* :ref:`atlas-api-alertConfigurations-getAlertConfig` - Returns the specified alert configuration from the specified project.
* :ref:`atlas-api-alertConfigurations-getAlertConfigs` - Returns all alert configurations set for the specified alert.
* :ref:`atlas-api-alertConfigurations-listAlertConfigs` - Returns all alert configurations for one project.
* :ref:`atlas-api-alertConfigurations-listMatcherFieldNames` - Get all field names that the matchers.fieldName parameter accepts when you create or update an Alert Configuration.
* :ref:`atlas-api-alertConfigurations-toggleAlertConfig` - Enables or disables the specified alert configuration in the specified project.
* :ref:`atlas-api-alertConfigurations-updateAlertConfig` - Updates one alert configuration in the specified project.


.. toctree::
   :titlesonly:

   createAlertConfig </command/atlas-api-alertConfigurations-createAlertConfig>
   deleteAlertConfig </command/atlas-api-alertConfigurations-deleteAlertConfig>
   getAlertConfig </command/atlas-api-alertConfigurations-getAlertConfig>
   getAlertConfigs </command/atlas-api-alertConfigurations-getAlertConfigs>
   listAlertConfigs </command/atlas-api-alertConfigurations-listAlertConfigs>
   listMatcherFieldNames </command/atlas-api-alertConfigurations-listMatcherFieldNames>
   toggleAlertConfig </command/atlas-api-alertConfigurations-toggleAlertConfig>
   updateAlertConfig </command/atlas-api-alertConfigurations-updateAlertConfig>
