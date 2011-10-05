Cursor Operator Methods
~~~~~~~~~~~~~~~~~~~~~~~

Query Cursor Methods
--------------------

.. describe:: count()

   Append the ``count()`` method to a "``.find()``" statement to
   return the number of matching objects for any query. ``count()``
   is optimized to perform this operation on the MongoDB server rather
   than in the application code.

   In normal operation, ``count()`` ignores the effects of the
   :operator:`skip()` and :operator:`limit()`. To consider these
   effects specify "``count(true)``".

.. describe:: limit()

   Append the ``limit()`` method to a "``.find()``" statement to
   specifies the maximum number of documents a query will
   return. ``limit()`` is analogous to the ``LIMIT`` statement in
   MySQL and PostgreSQL.

   Use ``limit()`` to maximize performance and avoid having MongoDB
   return more results than are required for processing.

   A ``limit()`` value of 0 (e.g. "``.limit(0)``") is equivalent to
   setting no limit.

.. describe:: skip()

   Append ``skip()`` to a "``.find()``" statement to control where
   MongoDB begins returning results. This approach may be useful in
   implementing "paged" results. Consider the following JavaScript
   function as an example of the sort function: ::

        function printStudents(pageNumber, nPerPage) {
           print("Page: " + pageNumber);
           db.students.find().skip((pageNumber-1)*nPerPage).limit(nPerPage).forEach( function(student) { print(student.name + "<p>"); } );
        }

   The ``skip()`` method can be quite costly because it requires the
   serer to walk from the beginning of the collection or index to get
   the offset or skip position before beginning to return result. As
   offset (e.g. ``pageNumber`` above) increases, ``skip()`` will
   become slower and more CPU intensive. With larger collections,
   ``skip()`` may become IO bound.

   Consider using range-based pagination for these kinds of
   tasks. This approach features better index utilization, if you do
   not need to easily jump to a specific page.

TODO the above is mostly stolen from the wiki, and I'm not sure I understand what range-based paging is or where to link to an appropriate section.

.. describe:: snapshot()

   Append the ``snapshot()`` method to the ``.find()`` statement to
   toggle the "snapshot" mode. This ensures that the query will not
   miss any documents and return no duplicates, when objects are
   updated while the query runs. Snapshot mode does not impact the
   handling of documents which are added or removed during the query.

   Short queries of less than 1 megabyte are effectively snapshotted.

TODO verify clarity of sort explanation.

.. describe:: sort()

   Append the ``sort()`` method to the ``.find()``" statement to
   control the order that matching documents are returned by the
   query. Consider the following example: ::

        db.collection.find().sort( { age: -1 } );

   Here, all documents in ``collection`` are returned ordered based on
   the ``age`` field in descending order. Specify a value of negative
   one (e.g. "``-1``", as above) to sort in descending order or a
   positive value (e.g. "``1``") to sort in ascending order.

   Unless you have a index for the specified key pattern, use
   ``sort()`` in conjunction with ``limit()`` to avoid requiring
   MongoDB to perform a large in-memory sort. ``limit()`` increases
   the speed and reduce the amount of memory required to return this
   query by way of an optimized algorithm.

Mongo Shell Methods
-------------------

.. describe:: next()

.. describe:: size()

.. describe:: explain()

.. describe:: showDiskLoc()

.. describe:: forEach()

.. describe:: map()

.. describe:: hasNext()

.. describe:: next()
