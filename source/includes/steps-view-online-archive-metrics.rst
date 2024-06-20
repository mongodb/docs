.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-data-federation.rst
      
   .. step:: Review the metrics.

      The page displays the following metrics for each {+fdi+} under the
      :guilabel:`Online Archive Federated Database Instances` section: 
      
      .. list-table:: 
         :stub-columns: 1
      
         * - Queries Executed / Month 
           - Number of queries executed (cumulative) in the current calendar
             month. |service| refreshes this value every 5 minutes.
      
         * - Data Processed / Month 
           - Amount of :ref:`data processed <atlas-data-federation-billing>`
             in the current calendar month. |service| refreshes this value
             every 5 minutes. 
      
         * - Data Returned / Month
           - Amount of :ref:`data returned <atlas-data-federation-billing>`
             in the current calendar month. |service| refreshes this value
             every 5 minutes. 
      
         * - Last Archive Run
           - Date and time when |service| last ran the archive job to
             archive data.     
