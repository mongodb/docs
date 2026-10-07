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

Returns, adds, edits, and removes Rate Limits for your AI Models.

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

* :ref:`atlas-api-aiModelRateLimits-getGroupModelLimits` - Retrieve AI model rate limits for the given group.
* :ref:`atlas-api-aiModelRateLimits-getGroupRateLimits` - Retrieve a single scoped AI model rate limit for the given group.
* :ref:`atlas-api-aiModelRateLimits-getOrgModelLimits` - Retrieve AI model rate limits for the given organization.
* :ref:`atlas-api-aiModelRateLimits-getOrgRateLimits` - Retrieve a single scoped AI model rate limit for the given organization.
* :ref:`atlas-api-aiModelRateLimits-resetGroupModelLimits` - Reset the scoped AI model rate limit for the given model group to default values.
* :ref:`atlas-api-aiModelRateLimits-resetGroupRateLimits` - Reset the AI Model rate limits for the given group to default values.
* :ref:`atlas-api-aiModelRateLimits-updateGroupRateLimits` - Update a scoped AI model rate limit for the given model group.


.. toctree::
   :titlesonly:

   getGroupModelLimits </command/atlas-api-aiModelRateLimits-getGroupModelLimits>
   getGroupRateLimits </command/atlas-api-aiModelRateLimits-getGroupRateLimits>
   getOrgModelLimits </command/atlas-api-aiModelRateLimits-getOrgModelLimits>
   getOrgRateLimits </command/atlas-api-aiModelRateLimits-getOrgRateLimits>
   resetGroupModelLimits </command/atlas-api-aiModelRateLimits-resetGroupModelLimits>
   resetGroupRateLimits </command/atlas-api-aiModelRateLimits-resetGroupRateLimits>
   updateGroupRateLimits </command/atlas-api-aiModelRateLimits-updateGroupRateLimits>
