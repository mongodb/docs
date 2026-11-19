.. _atlas-api-metricIntegrations:

============================
atlas api metricIntegrations
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, creates, updates, and removes metric integration configurations for a project.

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
     - help for metricIntegrations

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

* :ref:`atlas-api-metricIntegrations-createGroupMetricIntegration` - Creates a new metric integration configuration identified by a unique ID.
* :ref:`atlas-api-metricIntegrations-deleteGroupMetricIntegration` - Removes the configuration for one metric integration identified by its unique ID.
* :ref:`atlas-api-metricIntegrations-getGroupMetricIntegration` - Returns the configuration for one metric integration identified by its unique ID.
* :ref:`atlas-api-metricIntegrations-listGroupMetricIntegrations` - Returns all metric integration configurations for the project.
* :ref:`atlas-api-metricIntegrations-updateGroupMetricIntegration` - Updates the configuration for one metric integration identified by its unique ID.


.. toctree::
   :titlesonly:

   createGroupMetricIntegration </command/atlas-api-metricIntegrations-createGroupMetricIntegration>
   deleteGroupMetricIntegration </command/atlas-api-metricIntegrations-deleteGroupMetricIntegration>
   getGroupMetricIntegration </command/atlas-api-metricIntegrations-getGroupMetricIntegration>
   listGroupMetricIntegrations </command/atlas-api-metricIntegrations-listGroupMetricIntegrations>
   updateGroupMetricIntegration </command/atlas-api-metricIntegrations-updateGroupMetricIntegration>
