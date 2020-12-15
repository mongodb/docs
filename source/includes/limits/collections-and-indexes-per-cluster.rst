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
