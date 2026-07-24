.. _atlas-api-rateLimiting:

======================
atlas api rateLimiting
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns details about rate limit policies for the Atlas Administration API.

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
     - help for rateLimiting

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

* :ref:`atlas-api-rateLimiting-getRateLimit` - Get one rate limit endpoint set.
* :ref:`atlas-api-rateLimiting-listRateLimits` - Get all rate limits for all v2 Atlas Administration API endpoint sets.


.. toctree::
   :titlesonly:

   getRateLimit </command/atlas-api-rateLimiting-getRateLimit>
   listRateLimits </command/atlas-api-rateLimiting-listRateLimits>
