MongoDB 3.4 introduces :manual:`Read-Only Views </core/views>` that you can
use to filter incompatible data.

For example, you can create a view in the ``test`` database that contains
only documents containing a number in the ``grade`` field of a ``grades``
collection:

.. code-block:: javascript

   db.runCommand( { create: "numericGrades", viewOn: "grades", pipeline: [ { "$match": { "grade": { "$type": "number" } } } ] } )

You can then use :binary:`~bin.mongodrdl` to generate a schema from this view
as you would a collection:

.. code-block:: sh

   mongodrdl -d test -c numericGrades
