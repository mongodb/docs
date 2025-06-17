.. _atlas-api-privateEndpointServices:

=================================
atlas api privateEndpointServices
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes private endpoint services.

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
     - help for privateEndpointServices

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

* :ref:`atlas-api-privateEndpointServices-createPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one private endpoint for the specified cloud service provider.
* :ref:`atlas-api-privateEndpointServices-createPrivateEndpointService` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one private endpoint service for the specified cloud service provider.
* :ref:`atlas-api-privateEndpointServices-deletePrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one private endpoint from the specified project and private endpoint service, as managed by the specified cloud service provider.
* :ref:`atlas-api-privateEndpointServices-deletePrivateEndpointService` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one private endpoint service from the specified project.
* :ref:`atlas-api-privateEndpointServices-getPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the connection state of the specified private endpoint.
* :ref:`atlas-api-privateEndpointServices-getPrivateEndpointService` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the name, interfaces, and state of the specified private endpoint service from one project.
* :ref:`atlas-api-privateEndpointServices-getRegionalizedPrivateEndpointSetting` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Checks whether each region in the specified cloud service provider can create multiple private endpoints per region.
* :ref:`atlas-api-privateEndpointServices-listPrivateEndpointServices` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the name, interfaces, and state of all private endpoint services for the specified cloud service provider.
* :ref:`atlas-api-privateEndpointServices-toggleRegionalizedPrivateEndpointSetting` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Enables or disables the ability to create multiple private endpoints per region in all cloud service providers in one project.


.. toctree::
   :titlesonly:

   createPrivateEndpoint </command/atlas-api-privateEndpointServices-createPrivateEndpoint>
   createPrivateEndpointService </command/atlas-api-privateEndpointServices-createPrivateEndpointService>
   deletePrivateEndpoint </command/atlas-api-privateEndpointServices-deletePrivateEndpoint>
   deletePrivateEndpointService </command/atlas-api-privateEndpointServices-deletePrivateEndpointService>
   getPrivateEndpoint </command/atlas-api-privateEndpointServices-getPrivateEndpoint>
   getPrivateEndpointService </command/atlas-api-privateEndpointServices-getPrivateEndpointService>
   getRegionalizedPrivateEndpointSetting </command/atlas-api-privateEndpointServices-getRegionalizedPrivateEndpointSetting>
   listPrivateEndpointServices </command/atlas-api-privateEndpointServices-listPrivateEndpointServices>
   toggleRegionalizedPrivateEndpointSetting </command/atlas-api-privateEndpointServices-toggleRegionalizedPrivateEndpointSetting>

