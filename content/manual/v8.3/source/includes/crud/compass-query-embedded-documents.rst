.. |query_operations| replace:: query operations on embedded/nested documents

This page provides examples of |query_operations| using
:ref:`MongoDB Compass <compass-index>`. 

.. include:: /includes/driver-examples/examples-intro.rst

.. code-block:: javascript

   [
       { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
       { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
       { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
       { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
       { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
   ]

For instructions on inserting documents in MongoDB Compass, see
:ref:`Insert Documents <write-op-insert>`.

Query Nested Fields with Dot Notation
-------------------------------------

Specify query conditions on fields in an embedded/nested document with
:term:`dot notation` ``"field.nestedField"``.

.. note::

  When you query with dot notation, the field and nested field must be
  inside quotation marks.

Specify Equality Match on a Nested Field
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example selects all documents where the field ``uom``
nested in the ``size`` field equals ``"in"``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "size.uom": "in" }

Specify Match using Query Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A :ref:`query filter document <document-query-filter>` can
use the :ref:`query operators <query-selectors>` to specify
conditions in the following form:

.. code-block:: javascript

   { <field1>: { <operator1>: <value1> }, ... }

The following query uses the less than operator (:query:`$lt`) on
the field ``h`` embedded in the ``size`` field:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "size.h": { $lt: 15 } }

Specify ``AND`` Condition
~~~~~~~~~~~~~~~~~~~~~~~~~

The following query selects all documents where the nested field ``h``
is less than ``15``, the nested field ``uom`` equals ``"in"``, and the
``status`` field equals ``"D"``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" }

.. figure:: /images/compass-find-embedded-and.png
   :alt: Query multiple nested fields

Match an Embedded/Nested Document
---------------------------------

To specify an equality condition on a field that is an
embedded/nested document, use the
:ref:`query filter document <document-query-filter>`
``{ <field>: <value> }`` where ``<value>`` is the document
to match.

For example, the following query selects all documents where the field
``size`` equals the document ``{ h: 14, w: 21, uom: "cm" }``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { size: { h: 14, w: 21, uom: "cm" } }

.. figure:: /images/compass-match-embedded.png
   :alt: Query embedded field

.. warning::

   MongoDB does not recommend :ref:`comparisons <query-comparison>` on embedded
   documents because the operations require an *exact* match of the specified
   ``<value>`` document, including the field order.

   For example, the following query does not match any documents in the
   ``inventory`` collection:

   .. figure:: /images/compass-find-embedded-no-match.png
      :alt: Query embedded field

   Queries that use comparisons on embedded documents can result in
   unpredictable behavior when used with a driver that does not use ordered data
   structures for expressing queries. 
