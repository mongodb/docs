Starting in MongoDB 5.0, :doc:`map-reduce </core/map-reduce>` is
deprecated:

- Instead of :doc:`map-reduce </core/map-reduce>`, you should use an
  :doc:`aggregation pipeline </core/aggregation-pipeline>`. Aggregation
  pipelines provide better performance and usability than map-reduce.

- You can rewrite map-reduce operations using :ref:`aggregation
  pipeline stages <agg-pipeline-quick-ref>`, such as
  :pipeline:`$group`, :pipeline:`$merge`, and others. 

- For map-reduce operations that require custom functionality, you can
  use the :group:`$accumulator` and :expression:`$function` aggregation
  operators. You can use those
  operators to define custom aggregation expressions in JavaScript.

For examples of aggregation pipeline alternatives to map-reduce, see:

- :doc:`/reference/map-reduce-to-aggregation-pipeline`

- :doc:`/tutorial/map-reduce-examples`
