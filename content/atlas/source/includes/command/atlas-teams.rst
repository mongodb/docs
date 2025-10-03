.. _atlas-teams:

===========
atlas teams
===========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage your Atlas teams.

Create, list and manage your Atlas teams.

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
     - help for teams

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

* :ref:`atlas-teams-create` - Create a team for your organization.
* :ref:`atlas-teams-delete` - Remove the specified team from your organization.
* :ref:`atlas-teams-describe` - Return the details for the specified team for your organization.
* :ref:`atlas-teams-list` - Return all teams for your organization.
* :ref:`atlas-teams-rename` - Rename a team in your organization.
* :ref:`atlas-teams-users` - Manage your Atlas users.


.. toctree::
   :titlesonly:

   create </command/atlas-teams-create>
   delete </command/atlas-teams-delete>
   describe </command/atlas-teams-describe>
   list </command/atlas-teams-list>
   rename </command/atlas-teams-rename>
   users </command/atlas-teams-users>

