.. _atlas-api-aiModelRateLimits:

===========================
atlas api aiModelRateLimits
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol



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
     - help for aiModelRateLimits

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

* :ref:`atlas-api-aiModelRateLimits-getGroupModelLimit` - Retrieve a single AI model rate limit for the given group.
* :ref:`atlas-api-aiModelRateLimits-getOrgModelLimit` - Retrieve a single AI model rate limit for the given organization.
* :ref:`atlas-api-aiModelRateLimits-listGroupModelLimits` - Retrieve AI model rate limits for the given group.
* :ref:`atlas-api-aiModelRateLimits-listOrgModelLimits` - Retrieve AI model rate limits for the given organization.
* :ref:`atlas-api-aiModelRateLimits-resetModelRateLimits` - Reset the AI Model rate limits for the given group to default values.
* :ref:`atlas-api-aiModelRateLimits-updateModelRateLimit` - Update an AI model rate limit for the given model group.


.. toctree::
   :titlesonly:

   getGroupModelLimit </command/atlas-api-aiModelRateLimits-getGroupModelLimit>
   getOrgModelLimit </command/atlas-api-aiModelRateLimits-getOrgModelLimit>
   listGroupModelLimits </command/atlas-api-aiModelRateLimits-listGroupModelLimits>
   listOrgModelLimits </command/atlas-api-aiModelRateLimits-listOrgModelLimits>
   resetModelRateLimits </command/atlas-api-aiModelRateLimits-resetModelRateLimits>
   updateModelRateLimit </command/atlas-api-aiModelRateLimits-updateModelRateLimit>
