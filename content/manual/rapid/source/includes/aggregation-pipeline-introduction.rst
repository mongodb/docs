An aggregation pipeline consists of one or more :ref:`stages
<aggregation-pipeline-operator-reference>` that process documents. These 
documents can come from a collection, a view, or a specially designed stage. 

Each stage performs an operation on the input documents. For example, a stage 
can :expression:`$filter` documents, :pipeline:`$group` documents, and calculate 
values. The documents that a stage outputs are then passed to the next stage in 
the pipeline.

An aggregation pipeline can return results for groups of documents. You can also 
update documents with an aggregation pipeline using the stages shown in 
:ref:`updates-agg-pipeline`.

.. note::

   Aggregation pipelines run with the
   :method:`db.collection.aggregate()` method do not modify documents in
   a collection, unless the pipeline contains a :pipeline:`$merge` or
   :pipeline:`$out` stage.
