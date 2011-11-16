====================
JavaScript Interface
====================

.. highlight_language: javascript
.. highlight:: javascript

Shell Functions
---------------

.. js:function:: find()

   Provides access to querying functionality. The argument to
   ``find()`` takes the form of a :term:`JSON` document. See the
   ":doc:`/reference/operators`" for an overview of the available
   operators to provide query functionality.

.. js:function:: findOne()

   Returns only one document that satisfies the query specified as the
   argent to this function. If there are multiple documents that
   satisfy the query, this method returns the first document according
   to the :term:`natural order`.

TODO insert link to natural ordering here.

.. js:function:: save()

   Provides the ability to create a new document in the current
   database and collection. The argument to ``save()`` takes the form
   of a :term;`JSON` document. See ":ref:`update-operators`" for a
   reference of all operators that affect updates.

.. js:function:: update()

   Provides the ability to update an existing document in the current
   database and collection. The argument to ``update()`` takes the
   form of a :term;`JSON` document. See ":ref:`update-operators`" for
   a reference of all operators that affect updates.

Query Modifiers
---------------

.. js:function:: next()

   Returns the next document in the cursor returned by the
   :js:func:`find()` function. See :js:func:`hasNext()` for related
   functionality.

TODO expand with greater understanding of cursors

.. js:function:: size()

   Returns a count of the number of documents that match the
   :js:func:`find()` query.

.. js:function:: explain()

   Returns a document that describes the process used to return the
   query. This may provide useful insight when attempting to optimize
   a query.

   See :mongodb:operator:`$explain` for related functionality.

.. js:function:: showDiskLoc()

   Returns a document that describes the on-disk location of the
   objects returned by the query. See :mongodb:operator:`$showDiskLoc`
   for related functionality.

.. js:function:: forEach()

   Provides the ability to loop or iterate over the cursor returned by
   a :js:func:`find()` query and returns each result on the
   shell. Specify a JavaScript function as the argument for the
   ``forEach()`` function. Consider the following example: ::

         db.users.find().forEach( function(u) { print("user: " + u.name); } );

   See :js:func:`map()` for similar functionality.

.. js:function:: map()

   Provides the ability to loop or iterate over the cursor returned by
   a :js:func:`find()` query and returns each result as the member of
   an array. Specify a JavaScript function as the argument for the
   ``map()`` function. Consider the following example: ::

         db.users.find().map( function(u) { print("user: " + u.name); } );

   See :js:func:`forEach()` for similar functionality.

.. js:function:: hasNext()

   This function returns ``true``, if the cursor returned by the
   :js:func:`find()` query contains documents that can be iterated
   over to return results.

TODO expand with greater understanding of cursors

Query Cursor Methods
--------------------

.. js:function:: count()

   Append the ``count()`` method to a ":js:func:`.find()`" query to
   return the number of matching objects for any query. ``count()`` is
   optimized to perform this operation on the MongoDB server rather
   than in the application code.

   In normal operation, ``count()`` ignores the effects of the
   :js:func:`skip()` and :js:func:`limit()`. To consider these
   effects specify "``count(true)``".

.. js:function:: limit()

   Append the ``limit()`` method to a ":js:func:`find()`" query to
   specifies the maximum number of documents a query will
   return. ``limit()`` is analogous to the ``LIMIT`` statement in a
   SQL database.

   Use ``limit()`` to maximize performance and avoid having MongoDB
   return more results than are required for processing.

   A ``limit()`` value of 0 (e.g. "``.limit(0)``") is equivalent to
   setting no limit.

.. js:function:: skip()

   Append ``skip()`` to a ":js:func:`.find()`" query to control where
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

.. js:function:: snapshot()

   Append the ``snapshot()`` method to the :js:func:`find()` query to
   toggle the "snapshot" mode. This ensures that the query will not
   miss any documents and return no duplicates, when objects are
   updated while the query runs. Snapshot mode does not impact the
   handling of documents which are added or removed during the query.

   Short queries of less than 1 megabyte are effectively snapshotted.

TODO verify clarity of sort explanation.

.. js:function:: sort()

   Append the ``sort()`` method to the :js:func:`find()`" queries to control
   the order that matching documents are returned by the
   operation. Consider the following example: ::

        db.collection.find().sort( { age: -1 } );

   Here, all documents in ``collection`` are returned ordered based on
   the ``age`` field in descending order. Specify a value of negative
   one (e.g. "``-1``", as above) to sort in descending order or a
   positive value (e.g. "``1``") to sort in ascending order.

   Unless you have a index for the specified key pattern, use
   ``sort()`` in conjunction with :js:func:`limit()` to avoid
   requiring MongoDB to perform a large in-memory
   sort. :js:func:`limit()` increases the speed and reduce the amount
   of memory required to return this query by way of an optimized
   algorithm.
