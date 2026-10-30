The recommended maximum combined number of collections and indexes by
database edition are as follows:

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Database edition
     - Recommended maximum

   * - {+atlas-infinite-full+}
     - 5,000 active collections and indexes during public preview, on
       all cluster tiers

   * - {+atlas-core-full+}
     - * :guilabel:`M10`: 5,000 collections and indexes
       * :guilabel:`M20 / M30`: 10,000 collections and indexes
       * :guilabel:`M40+`: 100,000 collections and indexes

The following considerations apply:

- A collection or index is active when you run database operations on
  it.
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
