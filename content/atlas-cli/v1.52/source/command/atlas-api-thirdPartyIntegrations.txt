.. _atlas-api-thirdPartyIntegrations:

================================
atlas api thirdPartyIntegrations
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes third-party service integration configurations.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

MongoDB Cloud sends alerts to each third-party service that you configure.


IMPORTANT: Each project can only have one configuration per integrationType.

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
     - help for thirdPartyIntegrations

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

* :ref:`atlas-api-thirdPartyIntegrations-createGroupIntegration` - Adds the settings for configuring one third-party service integration.
* :ref:`atlas-api-thirdPartyIntegrations-deleteGroupIntegration` - Removes the settings that permit configuring one third-party service integration.
* :ref:`atlas-api-thirdPartyIntegrations-getGroupIntegration` - Returns the settings for configuring integration with one third-party service.
* :ref:`atlas-api-thirdPartyIntegrations-listGroupIntegrations` - Returns the settings that permit integrations with all configured third-party services.
* :ref:`atlas-api-thirdPartyIntegrations-updateGroupIntegration` - Updates the settings for configuring integration with one third-party service.


.. toctree::
   :titlesonly:

   createGroupIntegration </command/atlas-api-thirdPartyIntegrations-createGroupIntegration>
   deleteGroupIntegration </command/atlas-api-thirdPartyIntegrations-deleteGroupIntegration>
   getGroupIntegration </command/atlas-api-thirdPartyIntegrations-getGroupIntegration>
   listGroupIntegrations </command/atlas-api-thirdPartyIntegrations-listGroupIntegrations>
   updateGroupIntegration </command/atlas-api-thirdPartyIntegrations-updateGroupIntegration>
