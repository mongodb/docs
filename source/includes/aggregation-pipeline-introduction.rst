An aggregation pipeline consists of one or more :ref:`stages
<aggregation-pipeline-operator-reference>` that process documents:

- Each stage performs an operation on the input documents.
  For example, a stage can filter documents, group documents, and
  calculate values.

- The documents that are output from a stage are passed to the next
  stage.

- An aggregation pipeline can return results for groups of documents.
  For example, return the total, average, maximum, and minimum values.

Starting in MongoDB 4.2, you can also update documents with an
aggregation pipeline. See
:doc:`/tutorial/update-documents-with-aggregation-pipeline`.
