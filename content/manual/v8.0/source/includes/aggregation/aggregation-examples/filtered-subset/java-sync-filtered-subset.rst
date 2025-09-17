.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/java-sync-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses a ``persons`` collection, which contains documents
describing each person's name, date of birth, vocation, and other
details. The aggregation selects documents based on whether
their field values match specified criteria.

To create the ``persons`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/Tutorial.snippet.load-sample-data.java
   :language: java
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for people who are engineers.

      First, add a :pipeline:`$match` stage that finds documents in which
      the value of the ``vocation`` field is ``"ENGINEER"``:

      .. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/Tutorial.snippet.match.java
         :language: java
         :copyable: true
         :category: syntax example

   .. step:: Add a sort stage to sort from youngest to oldest.

      Next, add a :pipeline:`$sort` stage that sorts the
      documents in descending order by the ``dateofbirth`` field to
      list the youngest people first:

      .. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/Tutorial.snippet.sort.java
         :language: java
         :copyable: true
         :category: syntax example

   .. step:: Add a limit stage to see only three results.

      Next, add a :pipeline:`$limit`
      stage to the pipeline to output only the first three documents in
      the results.

      .. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/Tutorial.snippet.limit.java
         :language: java
         :copyable: true
         :category: syntax example

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes unnecessary fields from the result documents:

      .. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/Tutorial.snippet.unset.java
         :language: java
         :copyable: true
         :category: syntax example

      .. tip::

         Use the ``$unset`` operator instead of ``$project`` to avoid
         modifying the aggregation pipeline if documents with
         different fields are added to the collection.

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``persons`` collection:

      .. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/Tutorial.snippet.run-pipeline.java
         :language: java
         :copyable: true
         :category: syntax example

      Finally, run the application in your IDE.

   .. step:: Interpret the aggregation results.

      The aggregated result contains three documents. The documents
      represent the three youngest people with the vocation of ``"ENGINEER"``,
      ordered from youngest to oldest. The results omit the ``_id`` and ``address``
      fields.

      .. literalinclude:: /code-examples/tested/java/driver-sync/aggregation/pipelines/filter/TutorialOutput.txt
         :language: text
         :copyable: false
         :category: example return object

.. end-tutorial
