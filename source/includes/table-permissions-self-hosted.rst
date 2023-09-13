..
   Comment: The nested lists need blank lines before and after each list
            plus extra indents 

.. list-table::
   :header-rows: 1

   * - Sync Type
     - Target
     - Required Permissions

   * - default
     - source cluster
     -

         - readAnyDatabase
         - backup
         - clusterMonitor

   * - default
     - destination cluster
     -

         - readWriteAnyDatabase
         - restore
         - clusterMonitor
         - clusterManager

   * - write-blocking or reversing
     - source cluster
     -  

         - readWriteAnyDatabase
         - backup
         - restore
         - clusterMonitor
         - clusterManager

   * - write-blocking or reversing
     - destination cluster
     -

         - readWriteAnyDatabase
         - backup
         - restore
         - clusterMonitor
         - clusterManager

For details on server roles, see: :ref:`authorization`.

To update user permissions, see: :dbcommand:`grantRolesToUser`.

