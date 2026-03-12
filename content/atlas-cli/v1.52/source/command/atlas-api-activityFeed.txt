.. _atlas-api-activityFeed:

======================
atlas api activityFeed
======================

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
     - help for activityFeed

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

* :ref:`atlas-api-activityFeed-getGroupActivityFeed` - Returns a pre-filtered activity feed link for the specified project based on the provided date range and event types.
* :ref:`atlas-api-activityFeed-getOrgActivityFeed` - Returns a pre-filtered activity feed link for the specified organization based on the provided date range and event types.


.. toctree::
   :titlesonly:

   getGroupActivityFeed </command/atlas-api-activityFeed-getGroupActivityFeed>
   getOrgActivityFeed </command/atlas-api-activityFeed-getOrgActivityFeed>
