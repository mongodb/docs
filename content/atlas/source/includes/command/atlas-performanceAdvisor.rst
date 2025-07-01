.. _atlas-performanceAdvisor:

========================
atlas performanceAdvisor
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Learn more about slow queries and get suggestions to improve database performance.

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

* :ref:`atlas-performanceAdvisor-namespaces` - Retrieve namespaces for collections experiencing slow queries
* :ref:`atlas-performanceAdvisor-slowOperationThreshold` - Enable or disable management of the slow operation threshold for your cluster.
* :ref:`atlas-performanceAdvisor-slowQueryLogs` - Get log lines for slow queries for a specified host
* :ref:`atlas-performanceAdvisor-suggestedIndexes` - Get suggested indexes for collections experiencing slow queries


.. toctree::
   :titlesonly:

   namespaces </command/atlas-performanceAdvisor-namespaces>
   slowOperationThreshold </command/atlas-performanceAdvisor-slowOperationThreshold>
   slowQueryLogs </command/atlas-performanceAdvisor-slowQueryLogs>
   suggestedIndexes </command/atlas-performanceAdvisor-suggestedIndexes>

