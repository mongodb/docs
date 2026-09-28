.. |query_operations| replace:: query operations on array fields

This page provides examples of |query_operations| using the
:go-api:`Collection.Find <mongo#Collection.Find>`
function in the
`MongoDB Go Driver <https://github.com/mongodb/mongo-go-driver/>`_.

.. include:: /includes/driver-examples/examples-intro.rst

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 20
   :end-before: End Example 20

Match an Array
--------------

To specify equality condition on an array, use the query
document ``{ <field>: <value> }`` where ``<value>`` is the
exact array to match, including the order of the elements.

The following example queries for all documents where
``tags`` is an array with exactly two elements,
``"red"`` and ``"blank"``, in the specified order:

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 21
   :end-before: End Example 21

To find an array that contains both ``"red"`` and
``"blank"`` regardless of order or other elements in
the array, use the :query:`$all` operator:

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 22
   :end-before: End Example 22

Query an Array for an Element
-----------------------------

To query if the array field contains at least *one* element
with the specified value, use the filter
``eq( <field>, <value>)`` where ``<value>`` is the element value.

The following example queries for all documents where
the ``tags`` array contains the string ``"red"``
as one of its elements:

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 23
   :end-before: End Example 23

To specify conditions on the elements in the array field,
use :ref:`query operators <query-selectors>` in the
:ref:`query filter document <document-query-filter>`. For example:

.. code-block:: go

   filter := bson.D{
       {"$and", bson.A{
           bson.D{{<array field>, bson.D{{"$eq", <value1>}}}},
           bson.D{{<array field>, bson.D{{"$lt", <value2>}}}},
       }},
   }

The following example queries for all documents where
the array ``dim_cm`` contains at least one element
whose value is greater than ``25``:

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 24
   :end-before: End Example 24

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

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 25
   :end-before: End Example 25

Query for an Array Element that Meets Multiple Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$elemMatch` operator to specify multiple criteria on
array elements so that at least one array element satisfies all the
specified criteria.

The following example queries for documents where the
``dim_cm`` array contains at least one element that
is both greater than (:query:`$gt`) ``22`` and less
than (:query:`$lt`) ``30``:

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 26
   :end-before: End Example 26

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

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 27
   :end-before: End Example 27

Query an Array by Array Length
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$size` operator to query for arrays by number of
elements.

The following example selects documents where
``tags`` has 3 elements:

.. literalinclude:: /driver-examples/go_examples.go
   :language: go
   :dedent: 2
   :start-after: Start Example 28
   :end-before: End Example 28
