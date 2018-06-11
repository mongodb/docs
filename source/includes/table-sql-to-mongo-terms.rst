.. list-table::
   :header-rows: 1

   * - SQL Terms/Concepts
     - MongoDB Terms/Concepts

   * - database
     - :term:`database`

   * - table
     - :term:`collection`

   * - row
     - :term:`document` or :term:`BSON` document

   * - column
     - :term:`field`

   * - index
     - :term:`index`

   * - table joins

     - :pipeline:`$lookup`, embedded documents

   * - primary key

       Specify any unique column or column combination as primary key.

     - :term:`primary key`

       In MongoDB, the primary key is automatically set to the
       :term:`_id` field.

   * - aggregation (e.g. group by)
     - aggregation pipeline

       See the :doc:`/reference/sql-aggregation-comparison`.

   * - transactions

     - :doc:`/core/transactions`

       .. tip::

          For many scenarios, the :ref:`denormalized data model
          (embedded documents and arrays) <data-modeling-embedding>`
          will continue to be optimal for your data and use cases
          instead of multi-document transactions. That is, for many
          scenarios, modeling your data appropriately will minimize the
          need for multi-document transactions.
