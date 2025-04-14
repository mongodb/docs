Starting in MongoDB 4.2, you can specify :doc:`read concern
</reference/read-concern>` level :readconcern:`"majority"` for an
aggregation that includes an :pipeline:`$out` stage.
 
In MongoDB 4.0 and earlier, you cannot include the :pipeline:`$out`
stage to use :readconcern:`"majority"` read concern for the aggregation.
