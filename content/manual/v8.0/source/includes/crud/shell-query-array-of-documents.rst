.. |query_operations| replace:: query operations on an array of nested documents

This page provides examples of |query_operations| using the
:method:`db.collection.find()` method in :binary:`mongosh`.

.. code-block:: javascript

   db.inventory.insertMany( [
      { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
      { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
      { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
      { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
      { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
   ]);

Query for a Document Nested in an Array
---------------------------------------

The following example selects all documents where an element in the
``instock`` array matches the specified document:

.. code-block:: javascript

   db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )

Equality matches on the whole embedded/nested document require an
*exact* match of the specified document, including the field order. For
example, the following query does not match any documents in the
``inventory`` collection:

.. code-block:: javascript

   db.inventory.find( { "instock": { qty: 5, warehouse: "A" } } )

Specify a Query Condition on a Field in an Array of Documents
-------------------------------------------------------------

Specify a Query Condition on a Field Embedded in an Array of Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you do not know the index position of the document nested in the
array, concatenate the name of the array field, with a dot (``.``) and
the name of the field in the nested document.

The following example selects all documents where the ``instock`` array
has at least one embedded document that contains the field ``qty``
whose value is less than or equal to ``20``:

.. code-block:: javascript

   db.inventory.find( { 'instock.qty': { $lte: 20 } } )

Use the Array Index to Query for a Field in the Embedded Document
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using :term:`dot notation`, you can specify query conditions for a
field in a document at a particular index or position of the array.
The array uses zero-based indexing.

.. note::

   When querying using dot notation, the field and index must be
   inside quotation marks.

The following example selects all documents where the ``instock`` array
has as its first element a document that contains the field ``qty``
whose value is less than or equal to ``20``:

.. code-block:: javascript

   db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )

Specify Multiple Conditions for Array of Documents
--------------------------------------------------

When you specify conditions on more than one field nested in an array
of documents, you can specify the query such that either a single
document meets these conditions or any combination of documents in the
array meets the conditions.

A Single Nested Document Meets Multiple Query Conditions on Nested Fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$elemMatch` operator to specify multiple criteria on
an array of embedded documents such that at least one embedded
document satisfies all the specified criteria.

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains both the field
``qty`` equal to ``5`` and the field ``warehouse`` equal
to ``A``:

.. code-block:: javascript

   db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains the field ``qty`` that
is greater than ``10`` and less than or equal to ``20``:

.. code-block:: javascript

   db.inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )

Combination of Elements Satisfies the Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the compound query conditions on an array field do not use the
:query:`$elemMatch` operator, the query selects those documents whose
array contains any combination of elements that satisfies the
conditions.

For example, the following query matches documents where any document
nested in the ``instock`` array has the ``qty`` field greater than
``10`` and any document (but not necessarily the same embedded
document) in the array has the ``qty`` field less than or equal to
``20``:

.. code-block:: javascript

   db.inventory.find( { "instock.qty": { $gt: 10,  $lte: 20 } } )

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains the field ``qty``
equal to ``5`` and at least one embedded document (but not necessarily
the same embedded document) that contains the field ``warehouse`` equal
to ``A``:

.. code-block:: javascript

   db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )
