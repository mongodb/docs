.. _atlas-streams:

=============
atlas streams
=============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage your Atlas Stream Processing deployments.

The streams command provides access to your Atlas Stream Processing configurations. You can create, edit, and delete streams, as well as change the connection registry.

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
     - help for streams

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

* :ref:`atlas-streams-connections` - Manage Atlas Stream Processing connections.
* :ref:`atlas-streams-instances` - Manage Atlas Stream Processing instances.


.. toctree::
   :titlesonly:

   connections </command/atlas-streams-connections>
   instances </command/atlas-streams-instances>

