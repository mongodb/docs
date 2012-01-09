====================
Meta Query Operators
====================

.. default-domain:: mongodb

Introduction
------------

In addition to the :doc:`MongoDB Query Operators
</reference/operators>`, there are a number of "meta" operators that
you may use to modify the output or behavior or output of the
query. Specify these modifiers to a :js:func:`find()` query, in the
following form (for the :option:`mongo` shell):

.. code-block:: javascript

   db.collection.find( { [QUERY] } )._addSpecial( [MODIFER] )

Here, the query specified by "``[QUERY]``" runs on the collection
named ``collection`` while the operation specified by the
``[MODIFER]`` The results are then processed by a modifier expression
selected from the following list. Many of the operators have
corresponding :doc:`methods in the shell </reference/javascript>`. For
the proposes of this reference, this document assumes the above form
where possible.

Modifiers
---------

.. operator:: $returnKey

   Only return the index key (i.e. :term:`_id`) or keys for the
   results of the query. Use the following form:

   .. code-block:: javascript

      db.collection.find()._addSpecial("$returnKey" , true )

.. operator:: $maxScan

   Constrains the query to only scan the specified number of documents
   when fulfilling the query. Use the following form:

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$maxScan" , 50 )

   Use this modifier to prevent potentially long running queries from
   disrupting performance by scanning through too much data.

.. operator:: $showDiskLoc

   Use the following modifier to display the disk location:

   .. code-block:: javascript

      db.collection.find()._addSpecial("$showDiskLoc" , true)

.. operator:: $comment

   The ``$comment`` makes it possible to attach a comment to a
   query. Because these comments propagate to the
   :command:`profile` log, adding ``$comment`` modifiers can
   make your profile data much easier to interpret and trace. Consider
   the following example:

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$comment" , "[COMMENT]" )

   Here, ``[COMMENT]`` represents the text of the comment.

.. operator:: $min

   Specify a ``$min`` value to specify a lower boundary for the value
   of a field. This boundary is enforced using an index of that field.

   .. code-block:: javascript

      db.collection.find( { [QUERY] } )._addSpecial("$min" , { value : 20})

   This operation above limits the documents returned to those that
   match the query described by "``[QUERY]``" where the field
   "``value``" is at least "``20``". The index is inferred based on
   the "``query``" unless specified by the :js:func:`hint()` function.

   Use operation alone or in conjunction with :operator:`$max`
   to limit results to a specific range.

.. operator:: $max

   Specify a ``$max`` value to specify an upper boundary for the value
   of a field. This boundary is enforced using an index of that field.

   .. code-block:: javascript

       db.collection.find()._addSpecial("$max" , { value : 100 })

   This operation above limits the documents returned to those that
   match the query described by "``[QUERY]``" where the field
   "``value``" is less than "``20``". The index is inferred based on
   on the "``query``" unless specified by the  :js:func:`hint()`
   function.

   Use operation alone or in conjunction with :operator:`$min`
   to limit results to a specific range.

.. operator:: $query

   The ``$query`` operator provides an interface to describe
   queries. Consider the following operation.

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$query" : { value : 100 } )

   This is equivalent to the following :js:func:`find()` method that
   may be more familiar to you:

   .. code-block:: javascript

      db.collection.find( { value : 100 } )

.. operator:: $orderby

   The ``$orderby`` operator provides the ability to sort the results
   of a query in ascending or descending order. Consider the following
   syntax:

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$orderby", { age : -1} )

   This is equivalent to the following :js:func:`sort()` method that
   may be more familiar to you:

   .. code-block:: javascript

      db.collection.find().sort( { age: -1 } )

   In both of these examples all documents in the collection named
   ``collection`` are returned sorted for in descending order from
   greatest to smallest. Specify a value to ``$orderby`` of negative
   one (e.g. "``-1``", as above) to sort in descending order or a
   positive value (e.g. "``1``") to sort in ascending order.

   Unless you have a index for the specified key pattern, use
   ``$orderby`` in conjunction with :operator:`$maxScan` and
   :js:func:`limit()` to avoid requiring MongoDB to perform a large
   in-memory sort. :js:func:`limit()` increases the speed and reduce
   the amount of memory required to return this query by way of an
   optimized algorithm.

.. operator:: $hint

   Use the :operator:`$hint` operator to force the query optimizer to
   use a specific index to fulfill the query. Consider the following
   form:

   .. code-block:: javascript

       db.collection.find()._addSpecial( "$hint", { _id : 1 } )

   This operation returns all documents in the collection named
   "``collection``" using the index on the "``_id``" field. Use this
   operator to prevent MongoDB from performing inefficient queries.

.. operator:: $explain

   Use the ``$explain`` operator to return a :term:`JSON` document
   that describes the process used to return the query. This may
   provide useful insight when attempting to optimize a
   query. Consider the following example:

   .. code-block:: javascript

       db.collection.find()._addSpecial( "$explain", 1 )

   The JavaScript function :js:func:`explain()` provides equivalent
   functionality in the :option:`mongo` shell. See the following
   example, which is equivalent to the above:

   .. code-block:: javascript

      db.collection.find().explain()

.. operator:: $snapshot

   The ``$snapshot`` operator ensures that the results returned by a
   query:

   - contains no duplicates.
   - misses no objects.
   - returns all matching objects that were present at the beginning
     and the end of the query.

   Snapshot mode does not guarantee that an object that was present at
   the beginning of the query but not at the end (due to an update)
   will be included or not included. Consider the following example:

   .. code-block:: javascript

      db.foo.find()._addSpecial( "$snapshot", true )

   The JavaScript function :js:func:`snapshot()` provides equivalent
   functionality in the :option:`mongo` shell. See the following
   example, which is equivalent to the above:

   .. code-block:: javascript

      db.foo.find().snapshot()

   Snapshot mode cannot be used with :operator:`$hint`, or
   :operator:`$orderBy` (:js:func:`sort()`.)

   All queries with response less than 1 megabyte are effectively
   snapshotted.
