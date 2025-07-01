.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-online-archive.rst
      
   .. step:: Click :icon-mms:`ellipsis` for the online archive for which you want to download query logs and select :guilabel:`Download Online Archive Query Logs` from the dropdown.
      
   .. step:: Select the :guilabel:`Source` for which you want to download logs.
      
      You can chose one of these: 
      
      - :guilabel:`Online Archive Only` to download logs for queries 
        against your {+Online-Archive+} only
      - :guilabel:`Cluster and Online Archive` to download logs for queries 
        against both the |service| cluster and {+Online-Archive+}
      
   .. step:: Select the :guilabel:`Time Period` for which you want to download logs from the dropdown.
      
      You can chose one of these: 
      
      - :guilabel:`Last 4 Hours`
      - :guilabel:`Last 8 Hours`
      - :guilabel:`Last 12 Hours`
      - :guilabel:`Last 24 Hours`
      - :guilabel:`Custom Date`
      
   .. step:: Click :guilabel:`Download Logs` and follow your browser prompts to download the file.

      The downloaded log filename varies based on the :guilabel:`Source` 
      for which you are downloading the logs: 
      
      .. tabs:: 
      
         .. tab:: Online Archive Only 
            :tabid: oaonly
      
            .. code-block:: shell 
               :copyable: false 
      
               <cluster-name>_archive_only_<start-date>_<end-date>_queries.log.gz
      
         .. tab:: Cluster and Online Archive 
            :tabid: clusterandoa
      
            .. code-block:: shell 
               :copyable: false 
      
               <cluster-name>_cluster_archive_<start-date>_<end-date>_queries.log.gz    
