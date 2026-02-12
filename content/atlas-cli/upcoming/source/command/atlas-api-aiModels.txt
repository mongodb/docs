.. _atlas-api-aiModels:

==================
atlas api aiModels
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes API Keys and Rate Limits for your AI Models.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.



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
     - help for aiModels

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

* :ref:`atlas-api-aiModels-createModelApiKey` - Create a new AI model API key for the given group.
* :ref:`atlas-api-aiModels-deleteModelApiKey` - Delete an existing AI model API key in the given group.
* :ref:`atlas-api-aiModels-getGroupModelKey` - Retrieve a single AI model API key for the given group.
* :ref:`atlas-api-aiModels-getGroupModelLimit` - Retrieve a single AI model rate limit for the given group.
* :ref:`atlas-api-aiModels-getOrgModelKey` - Retrieve a single AI model API key for the given organization.
* :ref:`atlas-api-aiModels-getOrgModelLimit` - Retrieve a single AI model rate limit for the given organization.
* :ref:`atlas-api-aiModels-listGroupModelKeys` - Retrieve AI model API keys for the given group.
* :ref:`atlas-api-aiModels-listGroupModelLimits` - Retrieve AI model rate limits for the given group.
* :ref:`atlas-api-aiModels-listOrgModelKeys` - Retrieve AI model API keys for the given organization.
* :ref:`atlas-api-aiModels-listOrgModelLimits` - Retrieve AI model rate limits for the given organization.
* :ref:`atlas-api-aiModels-resetModelRateLimits` - Reset the AI Model rate limits for the given group to default values.
* :ref:`atlas-api-aiModels-updateModelApiKey` - Update an existing AI model API key in the given group.
* :ref:`atlas-api-aiModels-updateModelRateLimit` - Update an AI model rate limit for the given model group.


.. toctree::
   :titlesonly:

   createModelApiKey </command/atlas-api-aiModels-createModelApiKey>
   deleteModelApiKey </command/atlas-api-aiModels-deleteModelApiKey>
   getGroupModelKey </command/atlas-api-aiModels-getGroupModelKey>
   getGroupModelLimit </command/atlas-api-aiModels-getGroupModelLimit>
   getOrgModelKey </command/atlas-api-aiModels-getOrgModelKey>
   getOrgModelLimit </command/atlas-api-aiModels-getOrgModelLimit>
   listGroupModelKeys </command/atlas-api-aiModels-listGroupModelKeys>
   listGroupModelLimits </command/atlas-api-aiModels-listGroupModelLimits>
   listOrgModelKeys </command/atlas-api-aiModels-listOrgModelKeys>
   listOrgModelLimits </command/atlas-api-aiModels-listOrgModelLimits>
   resetModelRateLimits </command/atlas-api-aiModels-resetModelRateLimits>
   updateModelApiKey </command/atlas-api-aiModels-updateModelApiKey>
   updateModelRateLimit </command/atlas-api-aiModels-updateModelRateLimit>
