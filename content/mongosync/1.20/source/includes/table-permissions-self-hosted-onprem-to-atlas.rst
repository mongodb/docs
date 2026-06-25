..
   Comment: The nested lists need extra indents.  Keep roles in alphabetic
            order.

.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Sync Type
     - Required Source Permissions

   * - Default
     - - :authrole:`backup`
       - :authrole:`clusterMonitor`
       - :authrole:`readAnyDatabase`

   * - Dual Write-Blocking
     - - :authrole:`backup`
       - :authrole:`clusterManager`
       - :authrole:`clusterMonitor`
       - :authrole:`readWriteAnyDatabase`
       - :authrole:`restore`

   * - Reversing
     - - :authrole:`backup`
       - :authrole:`clusterManager`
       - :authrole:`clusterMonitor`
       - :authrole:`readWriteAnyDatabase`
       - :authrole:`restore`

   * - Multiple Reversals
     - - :authrole:`backup`
       - :authrole:`clusterManager`
       - :authrole:`clusterMonitor`
       - :authrole:`dbAdminAnyDatabase`
       - :authrole:`readWriteAnyDatabase`
       - :authrole:`restore`

For details on server roles, see: :ref:`authorization`.

To update user permissions, see: :dbcommand:`grantRolesToUser`.