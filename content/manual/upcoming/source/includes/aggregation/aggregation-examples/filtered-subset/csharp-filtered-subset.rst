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

.. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.cs
   :language: csharp
   :copyable: true
   :start-after: start-pocos
   :end-before: end-pocos
   :dedent:

To create the ``persons`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.cs
   :language: csharp
   :copyable: true
   :start-after: start-insert-persons
   :end-before: end-insert-persons
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for people who are engineers.

      First, start the aggregation on the ``persons`` collection and
      chain a :pipeline:`$match` stage that finds documents in which the
      value of the ``Vocation`` field is ``"ENGINEER"``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.cs
         :language: csharp
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a sort stage to sort from youngest to oldest.

      Next, add a :pipeline:`$sort` stage that sorts the
      documents in descending order by the ``DateOfBirth`` field to
      list the youngest people first:

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.cs
         :language: csharp
         :copyable: true
         :start-after: start-sort
         :end-before: end-sort
         :dedent:

   .. step:: Add a limit stage to see only three results.

      Next, add a :pipeline:`$limit` stage to the pipeline to output
      only the first three documents in the results.

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.cs
         :language: csharp
         :copyable: true
         :start-after: start-limit
         :end-before: end-limit
         :dedent:

   .. step:: Add a projection stage to remove unneeded fields.

      Finally, add a :pipeline:`$project` stage. The
      ``$project`` stage excludes unnecessary fields from the result
      documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.cs
         :language: csharp
         :copyable: true
         :start-after: start-project
         :end-before: end-project
         :dedent:

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregated result contains three documents. The documents
      represent the three youngest people with the vocation of ``"ENGINEER"``,
      ordered from youngest to oldest. The results omit the ``_id`` and ``Address``
      fields.

      .. code-block:: none
         :copyable: false

         { "PersonId" : "7363626383", "FirstName" : "Carl", "LastName" : "Simmons", "DateOfBirth" : { "$date" : "1998-12-26T13:13:55Z" }, "Vocation" : "ENGINEER" }
         { "PersonId" : "1723338115", "FirstName" : "Olive", "LastName" : "Ranieri", "DateOfBirth" : { "$date" : "1985-05-12T23:14:30Z" }, "Gender" : "FEMALE", "Vocation" : "ENGINEER" }
         { "PersonId" : "6392529400", "FirstName" : "Elise", "LastName" : "Smith", "DateOfBirth" : { "$date" : "1972-01-13T09:32:07Z" }, "Vocation" : "ENGINEER" }

.. end-tutorial
