.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Select the :guilabel:`Clusters` view for your deployment.

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
      
   .. step:: On the line listing the process, click :guilabel:`Metrics`.
      
   .. step:: Click the :guilabel:`Logs` tab.
      
      The tab displays log information.
      
   .. step:: Refresh the browser window to view updated entries.
