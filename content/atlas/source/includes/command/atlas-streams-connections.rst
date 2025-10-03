.. _atlas-streams-connections:

=========================
atlas streams connections
=========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage Atlas Stream Processing connections.

Create, list, update and delete your Atlas Stream Processing connections

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
     - help for connections

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

* :ref:`atlas-streams-connections-create` - Creates a connection for an Atlas Stream Processing instance.
* :ref:`atlas-streams-connections-delete` - Remove the specified Atlas Stream Processing connection from your project.
* :ref:`atlas-streams-connections-describe` - Return the details for the specified Atlas Stream Processing connection.
* :ref:`atlas-streams-connections-list` - Returns all Atlas Stream Processing connections from your Atlas Stream Processing instance.
* :ref:`atlas-streams-connections-update` - Modify the details of the specified connection within your Atlas Stream Processing instance.


.. toctree::
   :titlesonly:

   create </command/atlas-streams-connections-create>
   delete </command/atlas-streams-connections-delete>
   describe </command/atlas-streams-connections-describe>
   list </command/atlas-streams-connections-list>
   update </command/atlas-streams-connections-update>

