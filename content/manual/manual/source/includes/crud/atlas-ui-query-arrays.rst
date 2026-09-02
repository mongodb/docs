.. _query-array-atlas-ui:

Query an Array with {+atlas+}
---------------------------------

The example in this section uses the :atlas:`sample movies dataset 
</sample-data/sample-mflix/>`. To learn how to load the sample dataset 
into your {+atlas+} deployment, see :atlas:`Load Sample Data 
</sample-data/#std-label-load-sample-data>`.

To query an array in {+atlas+}, follow these steps:

.. procedure:: 
   :style: normal

   .. include:: /includes/atlas-nav/steps-db-deployments-page.rst

   .. step:: Navigate to the collection.

      .. include:: /includes/steps-nav-atlas-sample-movies.rst

   .. step:: Specify a query filter document.

      To query a document that contains an array, 
      specify a :ref:`query filter document <document-query-filter>`.
      A query filter document uses :ref:`query operators 
      <csfle-supported-query-operators>` to specify search conditions.
      Use the following example documents to query array fields in the 
      ``sample_mflix.movies`` collection.

      To apply a query filter, copy an example document into the 
      :guilabel:`Filter` search bar and click :guilabel:`Apply`.

Match an Array
--------------

To specify an equality condition on an array, use the query
document ``{ <field>: <value> }`` where ``<value>`` is the
exact array to match, including the order of the elements.
The following example finds documents where ``genres``
contains the ``["Action", "Comedy"]`` array in the specified
order:

.. code-block::

   { genres: ["Action", "Comedy"] }

To find an array that contains both ``Action`` and
``Comedy`` regardless of order or other elements in the
array, use the :query:`$all` operator:

.. code-block::

   { genres: { $all: ["Action", "Comedy"] } }

Query an Array for an Element
-----------------------------

To query if the array field contains at least one element with the 
specified value, use the filter ``{ <field>: <value> }`` where 
``<value>`` is the element value.

The following example queries for all documents where the
``genres`` field contains the string ``Short`` as one 
of its elements:

.. code-block::

   { genres: "Short" }

To specify conditions on the elements in the array field,
use :ref:`query operators <query-selectors>` in the
:ref:`query filter document <document-query-filter>`:

.. code-block::

   { <array field>: { <operator1>: <value1>, ... } }

The following example uses the :query:`$nin` operator to
query for all documents where the ``genres`` field does 
not contain ``Drama``:

.. code-block::

   { genres: { $nin: ["Drama"] } }

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
``cast`` array contains elements that in some combination
satisfy the query conditions. The following filter uses the
:query:`$regex` and :query:`$eq` operators to return
documents where a single array element ends in ``Olsen`` and
another element equals ``Mary-Kate Olsen`` or a single
element that satisfies both conditions:

.. code-block::

   { cast: { $regex: "Olsen$", $eq: "Mary-Kate Olsen" } }

This query filter returns movies that include ``Mary-Kate
Olsen`` in their cast, and movies that include both
``Mary-Kate Olsen`` and ``Ashley Olsen`` in their cast.

Query for an Array Element that Meets Multiple Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$elemMatch` operator to specify multiple criteria on
array elements so that at least one array element satisfies all the
specified criteria.

The following example uses the :query:`$elemMatch` and
:query:`$ne` operators to query for documents where
``languages`` contains at least one element that is both not
``null`` and does not equal ``English``:

.. code-block::

   { languages: { $elemMatch: { $ne: null, $ne: "English" } } }

Query for an Element by the Array Index Position
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use :term:`dot notation` to specify query conditions for an element at
a particular index or position of the array. The array uses zero-based
indexing.

.. note::

  When you query using dot notation, the field and nested field must be
  inside quotation marks.

The following example uses the :query:`$ne` operator to
query for all documents where the first element in
the ``countries`` array is not equal to ``USA``:

.. code-block::

   { "countries.0": { $ne: "USA" } }

Query an Array by Array Length
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the :query:`$size` operator to query for arrays by number of
elements.

The following example selects documents where ``genres`` has 3
elements:

.. code-block::

   { genres: { $size: 3 } }
