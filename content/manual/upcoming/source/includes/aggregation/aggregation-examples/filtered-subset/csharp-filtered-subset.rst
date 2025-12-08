.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/csharp-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses a ``persons`` collection, which contains documents
describing each person's name, date of birth, vocation, and other
details. The aggregation selects documents based on whether
their field values match specified criteria.

First, create C# classes to model the data in the ``persons``
collection:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/Person.snippet.model.cs
   :language: csharp
   :copyable: true
   :category: usage example

To create the ``persons`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/Tutorial.snippet.load-sample-data.cs
   :language: csharp
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for people who are engineers.

      First, start the aggregation on the ``persons`` collection and
      chain a :pipeline:`$match` stage that finds documents in which the
      value of the ``Vocation`` field is ``"ENGINEER"``:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/Tutorial.snippet.match.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a sort stage to sort from youngest to oldest.

      Next, add a :pipeline:`$sort` stage that sorts the
      documents in descending order by the ``DateOfBirth`` field to
      list the youngest people first:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/Tutorial.snippet.sort.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a limit stage to see only three results.

      Next, add a :pipeline:`$limit` stage to the pipeline to output
      only the first three documents in the results.

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/Tutorial.snippet.limit.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a projection stage to remove unneeded fields.

      Finally, add a :pipeline:`$project` stage. The
      ``$project`` stage excludes unnecessary fields from the result
      documents:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/Tutorial.snippet.project.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregated result contains three documents. The documents
      represent the three youngest people with the vocation of ``"ENGINEER"``,
      ordered from youngest to oldest. The results omit the ``_id`` and ``Address``
      fields.

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/Filter/FilterTutorialOutput.txt
         :language: text
         :copyable: false
         :category: example return object

.. end-tutorial
