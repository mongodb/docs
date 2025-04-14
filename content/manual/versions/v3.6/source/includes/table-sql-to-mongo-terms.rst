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
