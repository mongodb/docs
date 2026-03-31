This page uses the following :binary:`~bin.mongosh` methods:

- :method:`db.collection.deleteMany()`
- :method:`db.collection.deleteOne()`

The examples on this page use the ``inventory`` collection. To
populate the ``inventory`` collection, run the following:

.. code-block:: javascript

   db.inventory.insertMany( [
      { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
      { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
      { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
      { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
      { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   ] );

.. _write-op-deleteMany:

Delete All Documents
--------------------

To delete all documents from a collection, pass an empty
:ref:`filter <document-query-filter>` document ``{}`` to the
:method:`db.collection.deleteMany()` method.

.. include:: /includes/fact-delete-all-inventory.rst

.. code-block:: javascript

   db.inventory.deleteMany({})

The method returns a document with the status of the operation. For
more information and examples, see
:method:`~db.collection.deleteMany()`.

Delete All Documents that Match a Condition
-------------------------------------------

.. include:: /includes/fact-delete-condition-inventory.rst

To specify equality conditions, use ``<field>:<value>``
expressions in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: javascript

   { <field1>: <value1>, ... }

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: javascript

   { <field1>: { <operator1>: <value1> }, ... }

To delete all documents that match a deletion criteria, pass a
:ref:`filter <document-query-filter>` parameter to the
:method:`~db.collection.deleteMany()` method.

.. include:: /includes/fact-remove-condition-inv-example.rst

.. code-block:: javascript

   db.inventory.deleteMany({ status : "A" })

The method returns a document with the status of the operation. For
more information and examples, see
:method:`~db.collection.deleteMany()`.

Delete Only One Document that Matches a Condition
-------------------------------------------------

To delete at most a single document that matches a specified filter
(even though multiple documents may match the specified filter) use
the :method:`db.collection.deleteOne()` method.

.. include:: /includes/fact-remove-one-condition-inv-example.rst

.. code-block:: javascript

   db.inventory.deleteOne( { status: "D" } )

.. seealso::

   - :method:`db.collection.deleteMany()`
   - :method:`db.collection.deleteOne()`
   - :ref:`additional-deletes`
