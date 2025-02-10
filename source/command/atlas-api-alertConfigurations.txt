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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and edits the conditions that trigger alerts and how MongoDB Cloud notifies users.

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

* :ref:`atlas-api-alertConfigurations-createAlertConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one alert configuration for the specified project.
* :ref:`atlas-api-alertConfigurations-deleteAlertConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one alert configuration from the specified project.
* :ref:`atlas-api-alertConfigurations-getAlertConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the specified alert configuration from the specified project.
* :ref:`atlas-api-alertConfigurations-listAlertConfigurationMatchersFieldNames` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Get all field names that the matchers.fieldName parameter accepts when you create or update an Alert Configuration.
* :ref:`atlas-api-alertConfigurations-listAlertConfigurations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all alert configurations for one project.
* :ref:`atlas-api-alertConfigurations-listAlertConfigurationsByAlertId` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all alert configurations set for the specified alert.
* :ref:`atlas-api-alertConfigurations-toggleAlertConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Enables or disables the specified alert configuration in the specified project.
* :ref:`atlas-api-alertConfigurations-updateAlertConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one alert configuration in the specified project.


.. toctree::
   :titlesonly:

   createAlertConfiguration </command/atlas-api-alertConfigurations-createAlertConfiguration>
   deleteAlertConfiguration </command/atlas-api-alertConfigurations-deleteAlertConfiguration>
   getAlertConfiguration </command/atlas-api-alertConfigurations-getAlertConfiguration>
   listAlertConfigurationMatchersFieldNames </command/atlas-api-alertConfigurations-listAlertConfigurationMatchersFieldNames>
   listAlertConfigurations </command/atlas-api-alertConfigurations-listAlertConfigurations>
   listAlertConfigurationsByAlertId </command/atlas-api-alertConfigurations-listAlertConfigurationsByAlertId>
   toggleAlertConfiguration </command/atlas-api-alertConfigurations-toggleAlertConfiguration>
   updateAlertConfiguration </command/atlas-api-alertConfigurations-updateAlertConfiguration>

