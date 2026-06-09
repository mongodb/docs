Before you begin, you must have the following:

- An |service| cluster with MongoDB version v8.0 or higher.

  .. note::

     Ensure that your |service| cluster has enough memory to store
     both |fts| and {+avs+} indexes and run performant queries.

- The :ref:`sample_mflix <sample-mflix>` data loaded into your |service|
  cluster.

- {+mongosh+} to run queries on your |service| cluster:

- :authrole:`Project Data Access Admin` access to the project to create
  {+avs+} and |fts| indexes.
