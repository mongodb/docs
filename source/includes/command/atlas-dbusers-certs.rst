.. _atlas-dbusers-certs:

===================
atlas dbusers certs
===================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage Atlas x509 certificates for your database users.

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
     - help for certs

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

* :ref:`atlas-dbusers-certs-create` - Create a new Atlas-managed X.509 certificate for the specified database user.
* :ref:`atlas-dbusers-certs-list` - Return all Atlas-managed, unexpired X.509 certificates for the specified database user.


.. toctree::
   :titlesonly:

   create </command/atlas-dbusers-certs-create>
   list </command/atlas-dbusers-certs-list>

