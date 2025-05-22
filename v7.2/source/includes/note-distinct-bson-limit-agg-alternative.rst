.. note::

   Results must not be larger than the maximum :ref:`BSON size
   <limit-bson-document-size>`. If your results exceed the maximum
   BSON size, use the aggregation pipeline to retrieve distinct
   values using the :pipeline:`$group` operator, as described in
   :ref:`Retrieve Distinct Values with the Aggregation Pipeline
   <aggregation-group-distinct-values>`.