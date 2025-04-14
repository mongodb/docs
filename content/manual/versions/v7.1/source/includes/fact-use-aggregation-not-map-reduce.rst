Starting in MongoDB 5.0, :ref:`map-reduce <map-reduce>` is
deprecated:

- Instead of :ref:`map-reduce <map-reduce>`, you should use an
  :ref:`aggregation pipeline <aggregation-pipeline>`. Aggregation
  pipelines provide better performance and usability than map-reduce.

- You can rewrite map-reduce operations using :ref:`aggregation pipeline
  stages <aggregation-pipeline-operator-reference>`, such as
  :pipeline:`$group`, :pipeline:`$merge`, and others. 

- For map-reduce operations that require custom functionality, you can
  use the :group:`$accumulator` and :expression:`$function` aggregation
  operators, available starting in version 4.4. You can use those
  operators to define custom aggregation expressions in JavaScript.

For examples of aggregation pipeline alternatives to map-reduce, see:

- :doc:`/reference/map-reduce-to-aggregation-pipeline`

- :doc:`/tutorial/map-reduce-examples`
