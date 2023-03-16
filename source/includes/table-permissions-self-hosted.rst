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
         - clusterMonitor (sharded clusters only)

   * - default
     - destination cluster
     -

         - readWriteAnyDatabase
         - restore
         - clusterManager (sharded clusters only)

   * - write-blocking or reversing
     - source cluster
     -  

         - readWriteAnyDatabase
         - backup
         - restore
         - clusterManager (sharded clusters only)

   * - write-blocking or reversing
     - destination cluster
     -

         - readWriteAnyDatabase
         - backup
         - restore
         - clusterManager (sharded clusters only)

For details on server roles, see: :ref:`authorization`.

To update user permissions, see: :dbcommand:`grantRolesToUser`.

