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

Returns and acknowledges alerts that MongoDB Cloud triggers based on the alert conditions that you define.

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

* :ref:`atlas-api-alerts-acknowledgeAlert` - Confirms receipt of one existing alert.
* :ref:`atlas-api-alerts-getAlert` - Returns one alert.
* :ref:`atlas-api-alerts-getAlertConfigAlerts` - Returns all open alerts that the specified alert configuration triggers.
* :ref:`atlas-api-alerts-listAlerts` - Returns all alerts.


.. toctree::
   :titlesonly:

   acknowledgeAlert </command/atlas-api-alerts-acknowledgeAlert>
   getAlert </command/atlas-api-alerts-getAlert>
   getAlertConfigAlerts </command/atlas-api-alerts-getAlertConfigAlerts>
   listAlerts </command/atlas-api-alerts-listAlerts>
