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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes third-party service integration configurations.

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

* :ref:`atlas-api-thirdPartyIntegrations-createThirdPartyIntegration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds the settings for configuring one third-party service integration.
* :ref:`atlas-api-thirdPartyIntegrations-deleteThirdPartyIntegration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the settings that permit configuring one third-party service integration.
* :ref:`atlas-api-thirdPartyIntegrations-getThirdPartyIntegration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the settings for configuring integration with one third-party service.
* :ref:`atlas-api-thirdPartyIntegrations-listThirdPartyIntegrations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the settings that permit integrations with all configured third-party services.
* :ref:`atlas-api-thirdPartyIntegrations-updateThirdPartyIntegration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the settings for configuring integration with one third-party service.


.. toctree::
   :titlesonly:

   createThirdPartyIntegration </command/atlas-api-thirdPartyIntegrations-createThirdPartyIntegration>
   deleteThirdPartyIntegration </command/atlas-api-thirdPartyIntegrations-deleteThirdPartyIntegration>
   getThirdPartyIntegration </command/atlas-api-thirdPartyIntegrations-getThirdPartyIntegration>
   listThirdPartyIntegrations </command/atlas-api-thirdPartyIntegrations-listThirdPartyIntegrations>
   updateThirdPartyIntegration </command/atlas-api-thirdPartyIntegrations-updateThirdPartyIntegration>

