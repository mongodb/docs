To return read and write distribution metrics for a collection using
:dbcommand:`analyzeShardKey`, you must configure the query
analyzer to sample the queries run on the collection. Otherwise,
``analyzeShardKey`` returns the read and write distribution metrics as
``0`` values. To configure the query analyzer, see
:ref:`configureQueryAnalyzer`.
