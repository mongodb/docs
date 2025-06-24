.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: Click a deployment.

   .. step:: (Optional) For sharded clusters, filter which process type is listed.
      
      The four buttons are listed in the following order, left to right:
      :guilabel:`Shards`, :guilabel:`Configs`, :guilabel:`Mongos`, and
      :guilabel:`BIs`. 
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
      
         * - Process
           - Displays
      
         * - :guilabel:`Shards`
      
           - :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` processes that host your data.
      
         * - :guilabel:`Configs`
      
           - :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` processes that run as :term:`config
             servers <config server>` to store a sharded cluster's metadata.
      
         * - :guilabel:`Mongos`
      
           - :manual:`mongos </reference/program/mongos/#mongodb-binary-bin.mongos>` processes that route data in a sharded 
             cluster.
      
         * - :guilabel:`BIs`
      
           - :abbr:`BI (Business Intelligence)` processes that access data 
             in a sharded cluster.
      
   .. step:: Click the process for which you want to calculate suggested indexes.
      
      For shared clusters, you must first click the shard that contains the
      process.
      
   .. step:: Click the :guilabel:`Profiler` tab above the charts.
      
   .. step:: Click the :guilabel:`Calculate Suggested Indexes` link above the chart.

      The :guilabel:`calculate suggested indexes` link will not appear
      if the :ref:`profiling-prerequisites` have not been met.
      
   .. step:: Copy the indexes you want to create and add them to the MongoDB process.

      For instructions on adding an index to a MongoDB process, see either:
      
      - :manual:`Index Creation </administration/indexes-creation>` in the MongoDB manual, or
      
      - :ref:`Create Indexes with Data Explorer <data-explorer-create-an-index>`. 
