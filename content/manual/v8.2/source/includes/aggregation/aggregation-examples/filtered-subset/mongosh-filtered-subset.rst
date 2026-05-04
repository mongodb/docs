.. start-prep-steps

This example uses a ``persons`` collection, which contains documents
describing each person's name, date of birth, vocation, and other
details. The aggregation selects documents based on whether
their field values match specified criteria.

To create the ``persons`` collection, use the
:method:`~db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/filter/load-data.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/filter/run-pipeline.js
         :language: javascript
         :copyable: true
         :category: usage example

   .. step:: Interpret the aggregation results.

      The aggregated results contain three documents. The documents
      represent the three youngest people with the ``vocation`` of
      ``ENGINEER``, ordered from youngest to oldest. The results omit
      the ``_id`` and ``address`` fields.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/filter/output.sh
         :language: shell
         :copyable: false
         :category: example return object

.. end-tutorial
