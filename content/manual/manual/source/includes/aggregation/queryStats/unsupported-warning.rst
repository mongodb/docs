.. warning::

   The ``$queryStats`` aggregation stage is unsupported and is not 
   guaranteed to be stable in a future release. MongoDB 
   actively evolves the organization of the ``$queryStats`` output, 
   so the structure and field paths in the metrics document 
   may change between versions. Do not build 
   functionality that depends on specific metrics field paths.  If the 
   ``$queryStats`` output schema changes, update your application code accordingly.