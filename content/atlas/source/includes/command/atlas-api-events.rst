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

Returns events.

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

* :ref:`atlas-api-events-getGroupEvent` - Returns one event for the specified project.
* :ref:`atlas-api-events-getOrgEvent` - Returns one event for the specified organization.
* :ref:`atlas-api-events-listEventTypes` - Returns a list of all event types, along with a description and additional metadata about each event.
* :ref:`atlas-api-events-listGroupEvents` - Returns events for the specified project.
* :ref:`atlas-api-events-listOrgEvents` - Returns events for the specified organization.


.. toctree::
   :titlesonly:

   getGroupEvent </command/atlas-api-events-getGroupEvent>
   getOrgEvent </command/atlas-api-events-getOrgEvent>
   listEventTypes </command/atlas-api-events-listEventTypes>
   listGroupEvents </command/atlas-api-events-listGroupEvents>
   listOrgEvents </command/atlas-api-events-listOrgEvents>
