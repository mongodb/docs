.. _atlas-privateEndpoints-azure:

============================
atlas privateEndpoints azure
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage Azure Private Endpoints.

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
     - help for azure

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

* :ref:`atlas-privateEndpoints-azure-create` - Create a new Azure private endpoint for your project.
* :ref:`atlas-privateEndpoints-azure-delete` - Remove the specified Azure private endpoint from your project.
* :ref:`atlas-privateEndpoints-azure-describe` - Return the details for the specified Azure private endpoint for your project.
* :ref:`atlas-privateEndpoints-azure-interfaces` - Manage Atlas Azure private endpoint interfaces.
* :ref:`atlas-privateEndpoints-azure-list` - Return all Azure private endpoints for your project.
* :ref:`atlas-privateEndpoints-azure-watch` - Watch the specified Azure private endpoint in your project until it becomes available.


.. toctree::
   :titlesonly:

   create </command/atlas-privateEndpoints-azure-create>
   delete </command/atlas-privateEndpoints-azure-delete>
   describe </command/atlas-privateEndpoints-azure-describe>
   interfaces </command/atlas-privateEndpoints-azure-interfaces>
   list </command/atlas-privateEndpoints-azure-list>
   watch </command/atlas-privateEndpoints-azure-watch>

