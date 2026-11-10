The recommended maximum combined number of collections and indexes by
database edition is as follows:

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Database edition
     - Recommended maximum

   * - {+atlas-infinite-full+}
     - Currently, during public preview:

       * :guilabel:`M10 / M20 / M30`: up to 5,000 active collections
         and indexes
       * :guilabel:`M40 / M50 / M60`: up to 15,000 active collections
         and indexes

   * - {+atlas-core-full+}
     - * :guilabel:`M10`: 5,000 collections and indexes
       * :guilabel:`M20 / M30`: 10,000 collections and indexes
       * :guilabel:`M40+`: 100,000 collections and indexes

The following considerations apply:

- A collection or index is active when you run database operations on
  it.
- To track the number of active collections and indexes in your
  {+atlas-infinite-cluster+}, see :ref:`atlas-infinite-metrics`.
- While there is no hard limit on the number of collections in a single
  cluster, the performance of a cluster might degrade if it serves a
  large number of collections and indexes.
- If you exceed the recommended maximum number of collections and
  indexes, database operations might run more slowly.
- Larger collections have a greater impact on performance.
- The performance impact of exceeding the recommended maximum resource
  number depends on your collection usage. Performance impacts are more
  likely if you use the majority of the existing collections
  consistently.
