.. _atlas-api-events:

================
atlas api events
================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns events.

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
     - help for events

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

* :ref:`atlas-api-events-getOrganizationEvent` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one event for the specified organization.
* :ref:`atlas-api-events-getProjectEvent` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one event for the specified project.
* :ref:`atlas-api-events-listEventTypes` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of all event types, along with a description and additional metadata about each event.
* :ref:`atlas-api-events-listOrganizationEvents` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all events for the specified organization.
* :ref:`atlas-api-events-listProjectEvents` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all events for the specified project.


.. toctree::
   :titlesonly:

   getOrganizationEvent </command/atlas-api-events-getOrganizationEvent>
   getProjectEvent </command/atlas-api-events-getProjectEvent>
   listEventTypes </command/atlas-api-events-listEventTypes>
   listOrganizationEvents </command/atlas-api-events-listOrganizationEvents>
   listProjectEvents </command/atlas-api-events-listProjectEvents>

