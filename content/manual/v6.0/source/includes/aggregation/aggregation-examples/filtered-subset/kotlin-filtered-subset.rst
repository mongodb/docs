.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/kotlin-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses a ``persons`` collection, which contains documents
describing each person's name, date of birth, vocation, and other
details. The aggregation selects documents based on whether
their field values match specified criteria.

First, create Kotlin data classes to model the data in the ``persons``
collection:

.. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
   :language: kotlin
   :copyable: true
   :start-after: start-data-classes
   :end-before: end-data-classes
   :dedent:

To create the ``persons`` collection and insert the sample data, add the
following code to your application:

.. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
   :language: kotlin
   :copyable: true
   :start-after: start-insert-persons
   :end-before: end-insert-persons
   :dedent:

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for people who are engineers.

      First, add a :pipeline:`$match` stage that finds documents in which
      the value of the ``vocation`` field is ``"ENGINEER"``:

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
         :language: kotlin
         :copyable: true
         :start-after: start-match
         :end-before: end-match
         :dedent:

   .. step:: Add a sort stage to sort from youngest to oldest.

      Next, add a :pipeline:`$sort` stage that sorts the
      documents in descending order by the ``dateOfBirth`` field to
      list the youngest people first:

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
         :language: kotlin
         :copyable: true
         :start-after: start-sort
         :end-before: end-sort
         :dedent:

   .. step:: Add a limit stage to see only three results.

      Next, add a :pipeline:`$limit`
      stage to the pipeline to output only the first three documents in
      the results.

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
         :language: kotlin
         :copyable: true
         :start-after: start-limit
         :end-before: end-limit
         :dedent:

   .. step:: Add an unset stage to remove unneeded fields.

      Finally, add an :pipeline:`$unset` stage. The
      ``$unset`` stage removes unnecessary fields from the result documents:
            
      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
         :language: kotlin
         :copyable: true
         :start-after: start-unset
         :end-before: end-unset
         :dedent:

      .. tip::

         Use the ``$unset`` operator instead of ``$project`` to avoid
         modifying the aggregation pipeline if documents with
         different fields are added to the collection.

   .. step:: Run the aggregation pipeline.

      Add the following code to the end of your application to perform
      the aggregation on the ``persons`` collection:

      .. literalinclude:: /includes/aggregation/aggregation-examples/filtered-subset/full-files/FilteredSubset.kt
         :language: kotlin
         :copyable: true
         :start-after: start-run-agg
         :end-before: end-run-agg
         :dedent:

      Finally, run the application in your IDE.

   .. step:: Interpret the aggregation results.

      The aggregated result contains three documents. The documents
      represent the three youngest people with the vocation of ``"ENGINEER"``,
      ordered from youngest to oldest. The results omit the ``_id`` and ``address``
      fields.

      .. code-block:: none
         :copyable: false

         Document{{personID=7363626383, firstname=Carl, lastname=Simmons, dateOfBirth=Sat Dec 26 08:13:55 EST 1998, vocation=ENGINEER}}
         Document{{personID=1723338115, firstname=Olive, lastname=Ranieri, dateOfBirth=Sun May 12 19:14:30 EDT 1985, vocation=ENGINEER, gender=FEMALE}}
         Document{{personID=6392529400, firstname=Elise, lastname=Smith, dateOfBirth=Thu Jan 13 04:32:07 EST 1972, vocation=ENGINEER}}

.. end-tutorial
