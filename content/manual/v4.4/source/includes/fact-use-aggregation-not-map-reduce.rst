An :doc:`aggregation pipeline </core/aggregation-pipeline>` provides
better performance and usability than a :doc:`map-reduce
</core/map-reduce>` operation.

Map-reduce operations can be rewritten using :ref:`aggregation pipeline
operators <agg-pipeline-quick-ref>`, such as
:pipeline:`$group`, :pipeline:`$merge`, and others. 

For map-reduce operations that require custom functionality, MongoDB
provides the :group:`$accumulator` and :expression:`$function`
aggregation operators starting in version 4.4. Use these operators to
define custom aggregation expressions in JavaScript.

For examples of aggregation pipeline alternatives to map-reduce
operations, see :doc:`/reference/map-reduce-to-aggregation-pipeline` and
:doc:`/tutorial/map-reduce-examples`.
