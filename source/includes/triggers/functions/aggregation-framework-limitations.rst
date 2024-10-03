Aggregation Methods
~~~~~~~~~~~~~~~~~~~

Atlas Functions support aggregation on the both the database and collection
level using the following commands:

- :manual:`db.aggregate() </reference/method/db.aggregate>`
- :manual:`db.collection.aggregate() </reference/method/db.collection.aggregate>`

Aggregation Pipeline Stage Availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All :manual:`aggregation pipeline stages </reference/operator/aggregation-pipeline/>` 
stages are available to the *system user* except for ``$indexStats``.

Aggregation Pipeline Operator Availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Atlas Functions support all :manual:`aggregation pipeline operators
</reference/operator/aggregation/>` when you run an aggregation pipeline
in the :ref:`system user <atlas-system-functions>` context.
