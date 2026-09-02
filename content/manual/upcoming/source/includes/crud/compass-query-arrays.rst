.. |query_operations| replace:: query operations on array fields

This page provides examples of |query_operations| using
:ref:`MongoDB Compass <compass-index>`.

.. include:: /includes/driver-examples/examples-intro.rst

.. code-block:: javascript

   [
       { "item": "journal", "qty": 25, "tags": ["blank", "red"], "dim_cm": [ 14, 21 ] },
       { "item": "notebook", "qty": 50, "tags": ["red", "blank"], "dim_cm": [ 14, 21 ] },
       { "item": "paper", "qty": 100, "tags": ["red", "blank", "plain"], "dim_cm": [ 14, 21 ] },
       { "item": "planner", "qty": 75, "tags": ["blank", "red"], "dim_cm": [ 22.85, 30 ] },
       { "item": "postcard", "qty": 45, "tags": ["blue"], "dim_cm": [ 10, 15.25 ] }
   ]

For instructions on inserting documents in MongoDB Compass, see
:ref:`Insert Documents <write-op-insert>`.

Match an Array
--------------

To specify equality condition on an array, use the query
document ``{ <field>: <value> }`` where ``<value>`` is the
exact array to match, including the order of the elements.

The following example queries for all documents where
``tags`` is an array with exactly two elements,
``"red"`` and ``"blank"``, in the specified order:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { tags: ["red", "blank"] }

.. figure:: /images/compass-array-match-exact.png
   :alt: Query array matching exactly

To find an array that contains both ``"red"`` and
``"blank"`` regardless of order or other elements in
the array, use the :query:`$all` operator:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { tags: { $all: ["red", "blank"] } }

.. figure:: /images/compass-array-match-all.png
   :alt: Query array matching all criteria

Query an Array for an Element
-----------------------------

To query if the array field contains at least *one* element
with the specified value, use the filter
``{ <field>: <value> }`` where ``<value>`` is the element value.

The following example queries for all documents where
the ``tags`` array contains the string ``"red"``
as one of its elements:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { tags: "red" }

.. figure:: /images/compass-array-elem-match.png
   :alt: Query array matching multiple criteria

To specify conditions on the elements in the array field,
use :ref:`query operators <query-selectors>` in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: javascript

   { <array field>: { <operator1>: <value1>, ... } }

The following example queries for all documents where
the array ``dim_cm`` contains at least one element
whose value is greater than ``25``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { dim_cm: { $gt: 25 } }

Specify Multiple Conditions for Array Elements
----------------------------------------------

When you specify compound conditions on array elements, you can query for
documents where either:

- A single array element meets all the specified conditions
- Different array elements collectively meet all the conditions, with each
  element satisfying one or more conditions

Query an Array with Compound Filter Conditions on the Array Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example queries for documents where the
``dim_cm`` array contains elements that in some
combination satisfy the query conditions. One element
can satisfy the greater than ``15`` condition and
another element can satisfy the less than ``20``
condition, or a single element can satisfy both:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { dim_cm: { $gt: 15, $lt: 20 } }

.. figure:: /images/compass-array-compound-filter.png
   :alt: Query array using a compound filter

Query for an Array Element that Meets Multiple Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$elemMatch` operator to specify multiple criteria on
array elements so that at least one array element satisfies all the
specified criteria.

The following example queries for documents where the
``dim_cm`` array contains at least one element that
is both greater than (:query:`$gt`) ``22`` and less
than (:query:`$lt`) ``30``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } }

.. figure:: /images/compass-array-compound-multiple-criteria.png
   :alt: Query array by multiple conditions

Query for an Element by the Array Index Position
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use :term:`dot notation` to specify query conditions for an element at
a particular index or position of the array. The array uses zero-based
indexing.

.. note::

  When you query using dot notation, the field and nested field must be
  inside quotation marks.

The following example queries for all documents where
the second element in the array ``dim_cm`` is greater
than ``25``:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:


.. code-block:: javascript

   { "dim_cm.1": { $gt: 25 } }

.. figure:: /images/compass-array-match-by-index.png
   :alt: Query array by index

Query an Array by Array Length
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$size` operator to query for arrays by number of
elements.

The following example selects documents where
``tags`` has 3 elements:

Copy the following filter into the Compass query bar and click
:guilabel:`Find`:

.. code-block:: javascript

   { "tags": { $size: 3 } }
