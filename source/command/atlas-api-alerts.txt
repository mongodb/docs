.. _atlas-api-alerts:

================
atlas api alerts
================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and acknowledges alerts that MongoDB Cloud triggers based on the alert conditions that you define.

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
     - help for alerts

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

* :ref:`atlas-api-alerts-acknowledgeAlert` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Confirms receipt of one existing alert.
* :ref:`atlas-api-alerts-getAlert` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one alert.
* :ref:`atlas-api-alerts-listAlerts` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all alerts.
* :ref:`atlas-api-alerts-listAlertsByAlertConfigurationId` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all open alerts that the specified alert configuration triggers.


.. toctree::
   :titlesonly:

   acknowledgeAlert </command/atlas-api-alerts-acknowledgeAlert>
   getAlert </command/atlas-api-alerts-getAlert>
   listAlerts </command/atlas-api-alerts-listAlerts>
   listAlertsByAlertConfigurationId </command/atlas-api-alerts-listAlertsByAlertConfigurationId>

