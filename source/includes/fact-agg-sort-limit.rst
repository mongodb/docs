.. versionchanged:: 2.4
   When a :agg:pipeline:`$sort` immediately precedes a
   :agg:pipeline:`$limit` in the pipeline, the :agg:pipeline:`$sort`
   operation only maintains the top n results as it progresses, where n
   is the specified limit. Before 2.4, :agg:pipeline:`$sort` would sort
   all the results in memory, and then limit the results to n results.
