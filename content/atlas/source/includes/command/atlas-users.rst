.. _atlas-users:

===========
atlas users
===========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage your Atlas users.

Create and manage your Atlas users.

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
     - help for users

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

* :ref:`atlas-users-describe` - Return the details for the specified Atlas user.
* :ref:`atlas-users-invite` - Create an Atlas user for your MongoDB Atlas application and invite the Atlas user to your organizations and projects.


.. toctree::
   :titlesonly:

   describe </command/atlas-users-describe>
   invite </command/atlas-users-invite>

