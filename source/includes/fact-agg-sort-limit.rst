.. versionchanged:: 2.4

   - When a :pipeline:`$sort` immediately precedes a :pipeline:`$limit`
     in the pipeline, the :pipeline:`$sort` operation only maintains
     the top n results as it progresses, where n is the specified
     limit, and MongoDB only needs to store the number of items
     specified by :pipeline:`$limit` in memory. Before MongoDB 2.4,
     :pipeline:`$sort` would sort all the results in memory, and then
     limit the results to n results.

   - Unless the :pipeline:`$sort` operator can use an index or
     immediately precedes a :pipeline:`$limit`, the :pipeline:`$sort`
     operation must fit within memory. Before MongoDB 2.4, unless the
     :pipeline:`$sort` operator can use an index, the :pipeline:`$sort`
     operation must fit within memory.

.. agg-sort-in-memory-limit

:pipeline:`$sort` will produce an error if the operation consumes 10
percent or more of RAM.
