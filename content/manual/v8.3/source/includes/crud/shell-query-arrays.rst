.. |query_operations| replace:: query operations on array fields

This page provides examples of |query_operations| using the
:method:`db.collection.find()` method in :binary:`mongosh`.

.. include:: /includes/sample-data-usage.rst

.. _array-match-exact:

Match an Array
--------------

To specify equality condition on an array, use the query
document ``{ <field>: <value> }`` where ``<value>`` is the
exact array to match, including the order of the elements.

The following example queries for all documents where
``genres`` is an array with exactly two elements,
``"Action"`` and ``"Comedy"``, in the specified order:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/match-exact-array.snippet.match-exact-array.js
   :language: javascript
   :category: usage example

To find an array that contains both ``"Action"`` and
``"Comedy"`` regardless of order or other elements in
the array, use the :query:`$all` operator:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/match-all.snippet.match-all.js
   :language: javascript
   :category: usage example

.. _array-match-single-element:

Query an Array for an Element
-----------------------------

To query if the array field contains at least *one* element
with the specified value, use the filter
``{ <field>: <value> }`` where ``<value>`` is the element value.

The following example queries for all documents where
the ``genres`` array contains the string ``"Short"``
as one of its elements:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/find-element.snippet.find-element.js
   :language: javascript
   :category: usage example

To specify conditions on the elements in the array field,
use :ref:`query operators <query-selectors>` in the
:ref:`query filter document <document-query-filter>`:

.. code-block:: javascript

   { <array field>: { <operator1>: <value1>, ... } }

The following example queries for all documents where
the ``cast`` array contains at least one element that
matches the regular expression ``^A``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/find-element-regex.snippet.find-element-regex.js
   :language: javascript
   :category: usage example

.. _specify-multiple-criteria-for-array-elements:

Specify Multiple Conditions for Array Elements
----------------------------------------------

When you specify compound conditions on array elements, you can query for
documents where either:

- A single array element meets all the specified conditions
- Different array elements collectively meet all the conditions, with each
  element satisfying one or more conditions

.. _combination-of-elements-satisfies-criteria:

Query an Array with Compound Filter Conditions on the Array Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example queries for documents where the
``cast`` array contains elements that in some
combination satisfy the query conditions. One element
can satisfy the ``$regex: "^A"`` condition and another
element can satisfy the ``$ne: "Adam Sandler"``
condition, or a single element can satisfy both:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/compound-filter.snippet.compound-filter.js
   :language: javascript
   :category: usage example

.. _single-element-satisfies-criteria:

Query for an Array Element that Meets Multiple Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$elemMatch` operator to specify multiple criteria on
array elements so that at least one array element satisfies all the
specified criteria.

The following example queries for documents where the
``cast`` array contains at least one element that both
matches the regular expression ``^A`` and is not equal
to ``"Adam Sandler"``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/elem-match.snippet.elem-match.js
   :language: javascript
   :category: usage example

Query for an Element by the Array Index Position
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use :term:`dot notation` to specify query conditions for an element at
a particular index or position of the array. The array uses zero-based
indexing.

.. note::

  When you query using dot notation, the field and nested field must be
  inside quotation marks.

The following example queries for all documents where
the first element in the array ``cast`` equals
``"Tom Hanks"``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/array-index.snippet.array-index.js
   :language: javascript
   :category: usage example

Query an Array by Array Length
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$size` operator to query for arrays by number of
elements.

The following example selects documents where
``genres`` has 3 elements:

.. literalinclude:: /code-examples/tested/command-line/mongosh/tutorial/query-arrays/array-size.snippet.array-size.js
   :language: javascript
   :category: usage example
