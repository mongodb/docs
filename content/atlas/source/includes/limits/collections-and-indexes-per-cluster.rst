While there is no hard limit on the number of collections in a single 
cluster, the performance of a cluster might degrade if it serves a large 
number of collections and indexes. Larger collections have a greater 
impact on performance.

The recommended maximum combined number of collections and indexes by
|service| cluster tier are as follows:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Cluster tier
     - Recommended maximum

   * - :guilabel:`M10`
     - 5,000 collections and indexes

   * - :guilabel:`M20 / M30`
     - 10,000 collections and indexes

   * - :guilabel:`M40+`
     - 100,000 collections and indexes

If you exceed the recommended maximum number of collections and indexes, database 
operations might run more slowly. :manual:`Checkpoints </core/wiredtiger/#snapshots-and-checkpoints>`
take longer to complete, which reduces operation speed. In some cases, operations
can stall if your usage exceeds your system's ``ulimit`` settings, which set
limitations on the number of system resources that you can use.

.. tip::

   To learn more about ``ulimit`` settings, see :manual:`UNIX ulimit Settings for Self-Managed Deployments
   </reference/ulimit>` in the MongoDB Server Manual.

The performance impact of exceeding the recommended maximum resource number
depends your collection usage. Performance impacts are more likely if you use
the majority of the existing collections consistently.