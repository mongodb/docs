An aggregation pipeline consists of one or more :ref:`stages
<aggregation-pipeline-operator-reference>` that process documents:

- Each stage performs an operation on the input documents.
  For example, a stage can filter documents, group documents, and
  calculate values.

- The documents that are output from a stage are passed to the next
  stage.

- An aggregation pipeline can return results for groups of documents.
  For example, return the total, average, maximum, and minimum values.

Starting in MongoDB 4.2, you can update documents with an aggregation
pipeline if you use the stages shown in
:doc:`/tutorial/update-documents-with-aggregation-pipeline`.

.. note::

   Aggregation pipelines run with the
   :method:`db.collection.aggregate()` method do not modify documents in
   a collection, unless the pipeline contains a :pipeline:`$merge` or
   :pipeline:`$out` stage.
