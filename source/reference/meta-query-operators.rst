====================
Meta Query Operators
====================

.. default-domain:: mongodb

Introduction
------------

In addition to the :doc:`MongoDB Query Operators
</reference/operators>`, there are a number of "meta" operators that
you may use to modify the output or behavior of a
query. Specify these modifiers to a :func:`find()` query, in the
following form (for the :program:`mongo` shell):

.. code-block:: javascript

   db.collection.find( { [QUERY] } )._addSpecial( [MODIFER] )

Here, the query specified by "``[QUERY]``" runs on the collection
named ``collection`` with the operation specified by the
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

   The :operator:`$comment` makes it possible to attach a comment to a
   query. Because these comments propagate to the
   :dbcommand:`profile` log, adding :operator:`$comment` modifiers can
   make your profile data much easier to interpret and trace. Consider
   the following example:

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$comment" , "[COMMENT]" )

   Here, ``[COMMENT]`` represents the text of the comment.

.. operator:: $min

   Specify a :operator:`$min` value to specify a lower boundary for
   the value of a field. :program:`mongod` enforces this boundary with
   an index of the field.

   .. code-block:: javascript

      db.collection.find( { [QUERY] } )._addSpecial("$min" , { value : 20})

   This operation above limits the documents returned to those that
   match the query described by "``[QUERY]``" where the field
   "``value``" is at least "``20``". :program:`mongod` infers the
   index based on the "``query``" unless specified by the
   :func:`hint()` function.

   Use operation alone or in conjunction with :operator:`$max`
   to limit results to a specific range.

TODO This should be avoided unless necessary, use $gte instead.

.. operator:: $max

   Specify a :operator:`$max` value to specify an upper boundary for
   the value of a field. :program:`mongod` enforces this boundary with
   an index of that field.

   .. code-block:: javascript

       db.collection.find()._addSpecial("$max" , { value : 100 })

   This operation above limits the documents returned to those that
   match the query described by "``[QUERY]``" where the field
   "``value``" is less than "``20``". :program:`mongod` infers the
   index based on on the "``query``" unless specified by the
   :func:`hint()` function.

   Use operation alone or in conjunction with :operator:`$min`
   to limit results to a specific range.

TODO This should be avoided unless necessary, use $lt instead.

.. operator:: $query

   The :operator:`$query` operator provides an interface to describe
   queries. Consider the following operation.

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$query" : { value : 100 } )

   This is equivalent to the following :func:`find()` method that
   may be more familiar to you:

   .. code-block:: javascript

      db.collection.find( { value : 100 } )

.. operator:: $orderby

   The :operator:`$orderby` operator sorts the results of a query in
   ascending or descending order. Consider the following syntax:

   .. code-block:: javascript

      db.collection.find()._addSpecial( "$orderby", { age : -1} )

   This is equivalent to the following :func:`sort()` method that
   may be more familiar to you:

   .. code-block:: javascript

      db.collection.find().sort( { age: -1 } )

   Both of these examples return all documents in the collection named
   ``collection`` sorted for in descending order from greatest to
   smallest. Specify a value to :operator:`$orderby` of negative one
   (e.g. "``-1``", as above) to sort in descending order or a positive
   value (e.g. "``1``") to sort in ascending order.

   Unless you have a index for the specified key pattern, use
   :operator:`$orderby` in conjunction with :operator:`$maxScan` and/or
   :func:`limit()` to avoid requiring MongoDB to perform a large
   in-memory sort. :func:`limit()` increases the speed and reduce
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

TODO - won't necessarily prevent an inefficient query, just lets you pick index manually.

.. operator:: $explain

   Use the :operator:`$explain` operator to return a :term:`document`
   that describes the process and indexes used to return the
   query. This may provide useful insight when attempting to optimize
   a query. Consider the following example:

   .. code-block:: javascript

       db.collection.find()._addSpecial( "$explain", 1 )

   The JavaScript function :func:`explain()` provides equivalent
   functionality in the :program:`mongo` shell. See the following
   example, which is equivalent to the above:

   .. code-block:: javascript

      db.collection.find().explain()

.. operator:: $snapshot

   The :operator:`$snapshot` operator ensures that the results
   returned by a query:

   - contains no duplicates.
   - misses no objects.
   - returns all matching objects that were present at the beginning
     and the end of the query.

   Snapshot mode does not guarantee the inclusion (or omission) of an
   object present at the beginning of the query but not at the end
   (due to an update.) Use the following syntax:

   .. code-block:: javascript

      db.foo.find()._addSpecial( "$snapshot", true )

   The JavaScript function :func:`snapshot()` provides equivalent
   functionality in the :program:`mongo` shell. See the following
   example, which is equivalent to the above:

   .. code-block:: javascript

      db.foo.find().snapshot()

   Do not use snapshot with :operator:`$hint`, or :operator:`$orderby`
   (:func:`sort()`.)

   All queries with responses less than 1 megabyte are effectively
   snapshotted.

TODO I don't think that's right about < 1 mb
