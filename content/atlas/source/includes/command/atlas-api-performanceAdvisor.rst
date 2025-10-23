.. _atlas-api-performanceAdvisor:

============================
atlas api performanceAdvisor
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns suggested indexes and slow query data for a database deployment.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Also enables or disables MongoDB Cloud-managed slow operation thresholds. To view field values in a sample query, you must have the Project Data Access Read Only role or higher. Otherwise, MongoDB Cloud returns redacted data rather than the field values.

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
     - help for performanceAdvisor

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

* :ref:`atlas-api-performanceAdvisor-disableManagedSlowMs` - Disables the slow operation threshold that MongoDB Cloud calculated for the specified project.
* :ref:`atlas-api-performanceAdvisor-enableManagedSlowMs` - Enables MongoDB Cloud to use its slow operation threshold for the specified project.
* :ref:`atlas-api-performanceAdvisor-getManagedSlowMs` - Get whether the Managed Slow MS feature is enabled.

* :ref:`atlas-api-performanceAdvisor-listClusterSuggestedIndexes` - Returns the indexes that the Performance Advisor suggests.
* :ref:`atlas-api-performanceAdvisor-listDropIndexSuggestions` - Returns the indexes that the Performance Advisor suggests to drop.
* :ref:`atlas-api-performanceAdvisor-listPerformanceAdvisorNamespaces` - Returns up to 20 namespaces for collections experiencing slow queries on the specified host.
* :ref:`atlas-api-performanceAdvisor-listSchemaAdvice` - Returns the schema suggestions that the Performance Advisor detects.
* :ref:`atlas-api-performanceAdvisor-listSlowQueryLogs` - Returns log lines for slow queries that the Performance Advisor and Query Profiler identified.
* :ref:`atlas-api-performanceAdvisor-listSuggestedIndexes` - Returns the indexes that the Performance Advisor suggests.

.. toctree::
   :titlesonly:

   disableManagedSlowMs </command/atlas-api-performanceAdvisor-disableManagedSlowMs>
   enableManagedSlowMs </command/atlas-api-performanceAdvisor-enableManagedSlowMs>
   getManagedSlowMs </command/atlas-api-performanceAdvisor-getManagedSlowMs>

   listClusterSuggestedIndexes </command/atlas-api-performanceAdvisor-listClusterSuggestedIndexes>
   listDropIndexSuggestions </command/atlas-api-performanceAdvisor-listDropIndexSuggestions>
   listPerformanceAdvisorNamespaces </command/atlas-api-performanceAdvisor-listPerformanceAdvisorNamespaces>
   listSchemaAdvice </command/atlas-api-performanceAdvisor-listSchemaAdvice>
   listSlowQueryLogs </command/atlas-api-performanceAdvisor-listSlowQueryLogs>
   listSuggestedIndexes </command/atlas-api-performanceAdvisor-listSuggestedIndexes>
