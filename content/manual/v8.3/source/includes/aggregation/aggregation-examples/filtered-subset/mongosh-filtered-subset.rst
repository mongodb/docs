.. start-prep-steps

.. include:: /includes/sample-data-usage.rst

The aggregation selects documents based on whether their field values
match specified criteria.

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/filter/run-pipeline.snippet.filter-agg.js
         :language: javascript
         :copyable: true
         :category: usage example

   .. step:: Interpret the aggregation results.

      The aggregated results contain three documents. The documents
      represent the three oldest movies in the ``Drama`` genre,
      ordered from oldest to newest. The results include only the
      ``title``, ``year``, ``directors``, and ``runtime`` fields.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/filter/output.js
         :language: javascript
         :copyable: false
         :category: example return object

.. end-tutorial
