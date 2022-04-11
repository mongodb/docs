.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1
   :header-rows: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``isCollectDatabaseSpecificsStatisticsEnabled``
     - boolean
     - Optional
     - Flag that indicates whether to enable statistics in 
       :doc:`cluster metrics </monitor-cluster-metrics>` collection for 
       the project. 

   * - ``isDataExplorerEnabled``
     - boolean
     - Optional
     - Flag that indicates whether to enable Data Explorer for the 
       project. If enabled, you can query your database with an easy to 
       use interface.

       .. important::

          .. include:: /includes/fact-disable-de-limitations.rst
     
   * - ``isPerformanceAdvisorEnabled``
     - boolean
     - Optional
     - Flag that indicates whether to enable Performance Advisor and 
       Profiler for the project. If enabled, you can analyze database 
       logs to recommend performance improvements.
     
   * - ``isRealtimePerformancePanelEnabled``
     - boolean
     - Optional
     - Flag that indicates whether to enable Real Time Performance 
       Panel for the project. If enabled, you can see real time 
       metrics from your MongoDB database.
     
   * - ``isSchemaAdvisorEnabled``
     - boolean
     - Optional
     - Flag that indicates whether to enable Schema Advisor for the 
       project. If enabled, you receive customized recommendations to 
       optimize your data model and enhance performance. Disable this 
       setting to disable schema suggestions in the :ref:`Performance 
       Advisor <performance-advisor>` and the :ref:`Data Explorer 
       <atlas-ui>`.
