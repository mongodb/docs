.. _atlas-api-maintenanceWindows:

============================
atlas api maintenanceWindows
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, and removes maintenance windows.

The maintenance procedure that MongoDB Cloud performs requires at least one replica set election during the maintenance window per replica set. You can defer a scheduled maintenance event for a project up to two times. Deferred maintenance events occur during your preferred maintenance window exactly one week after the previously scheduled date and time.

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
     - help for maintenanceWindows

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

* :ref:`atlas-api-maintenanceWindows-deferMaintenanceWindow` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Defers the maintenance window for the specified project.
* :ref:`atlas-api-maintenanceWindows-getMaintenanceWindow` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the maintenance window for the specified project.
* :ref:`atlas-api-maintenanceWindows-resetMaintenanceWindow` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Resets the maintenance window for the specified project.
* :ref:`atlas-api-maintenanceWindows-toggleMaintenanceAutoDefer` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Toggles automatic deferral of the maintenance window for the specified project.
* :ref:`atlas-api-maintenanceWindows-updateMaintenanceWindow` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the maintenance window for the specified project.


.. toctree::
   :titlesonly:

   deferMaintenanceWindow </command/atlas-api-maintenanceWindows-deferMaintenanceWindow>
   getMaintenanceWindow </command/atlas-api-maintenanceWindows-getMaintenanceWindow>
   resetMaintenanceWindow </command/atlas-api-maintenanceWindows-resetMaintenanceWindow>
   toggleMaintenanceAutoDefer </command/atlas-api-maintenanceWindows-toggleMaintenanceAutoDefer>
   updateMaintenanceWindow </command/atlas-api-maintenanceWindows-updateMaintenanceWindow>

