.. |query_operations| replace:: query operations on an array of nested documents

This page provides examples of |query_operations| using
:ref:`MongoDB Compass <compass-index>`. 

.. include:: /includes/driver-examples/examples-intro.rst

.. code-block:: javascript

   [
       { "item": "journal", "instock": [ { "warehouse": "A", "qty": 5 }, { "warehouse": "C", "qty": 15 } ] },
       { "item": "notebook", "instock": [ { "warehouse": "C", "qty": 5 } ] },
       { "item": "paper", "instock": [ { "warehouse": "A", "qty": 60 }, { "warehouse": "B", "qty": 15 } ] },
       { "item": "planner", "instock": [ { "warehouse": "A", "qty": 40 }, { "warehouse": "B", "qty": 5 } ] },
       { "item": "postcard", "instock": [ { "warehouse": "B","qty": 15 }, { "warehouse": "C", "qty": 35 } ] }
   ]

For instructions on inserting documents in MongoDB Compass, see
:ref:`Insert Documents <write-op-insert>`.

Query for a Document Nested in an Array
---------------------------------------

The following example selects all documents where an element in the
``instock`` array matches the specified document:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "instock": { warehouse: "A", qty: 5 } }

Equality matches on the whole embedded/nested document require an
*exact* match of the specified document, including the field order. For
example, the following query does not match any documents in the
``inventory`` collection:

.. code-block:: javascript

   instock: { qty: 5, warehouse: 'A' }

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

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { 'instock.qty': { $lte: 20 } }

.. figure:: /images/compass-find-arr-embedded-field.png
   :alt: Query for embedded field matching single condition

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

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { 'instock.0.qty': { $lte: 20 } }

.. figure:: /images/compass-find-embedded-field-arr-index.png
   :alt: Query for array element matching single condition

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

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } }

.. figure:: /images/compass-multiple-query-conditions-nested-fields.png
   :alt: A single nested document meets multiple query conditions on nested fields

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains the field ``qty`` that
is greater than ``10`` and less than or equal to ``20``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } }

.. figure:: /images/compass-multiple-query-conditions-nested-fields-2.png
   :alt: A single nested document meets multiple query conditions on nested fields

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

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "instock.qty": { $gt: 10,  $lte: 20 } }

.. figure:: /images/compass-arr-match-combo-of-elements.png
   :alt: Query quantity value within range

The following example queries for documents where the ``instock`` array
has at least one embedded document that contains the field ``qty``
equal to ``5`` and at least one embedded document (but not necessarily
the same embedded document) that contains the field ``warehouse`` equal
to ``A``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "instock.qty": 5, "instock.warehouse": "A" }

.. figure:: /images/compass-arr-match-combo-of-elements-2.png
   :alt: Query matching quantity and warehouse location
