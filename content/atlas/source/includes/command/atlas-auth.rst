.. _atlas-auth:

==========
atlas auth
==========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage the CLI's authentication state.

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
     - help for auth

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

* :ref:`atlas-auth-login` - Authenticate with MongoDB Atlas.
* :ref:`atlas-auth-logout` - Log out of the CLI.
* :ref:`atlas-auth-register` - Register with MongoDB Atlas.
* :ref:`atlas-auth-whoami` - Verifies and displays information about your authentication state.


.. toctree::
   :titlesonly:

   login </command/atlas-auth-login>
   logout </command/atlas-auth-logout>
   register </command/atlas-auth-register>
   whoami </command/atlas-auth-whoami>

