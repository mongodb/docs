==================
Operator Reference
==================

.. default-domain:: mongodb
.. highlight:: javascript

This document contains a reference to all :term:`operators <operator>`
used with MongoDB in version |version|.

.. _query-selectors:

Query Selectors
---------------

Comparison
~~~~~~~~~~

.. operator:: $lt

   The :operator:`$lt` comparison operator provides the ability to select
   documents where a field is less than (e.g. "``<``") a value:

   .. code-block:: javascript

       db.collection.find( { field: { $lt: value } } );

   This query returns all documents in ``collection`` where a value
   of ``field`` is less than the specified "``value``".

.. operator:: $gt

   The :operator:`$gt` comparison operator provides the ability to select
   documents where a field is greater than (e.g. "``>``") a value:

   .. code-block:: javascript

      db.collection.find( { field: { $gt: value } } );

   This query returns all documents in ``collection`` where a value
   of ``field`` is greater than the specified "``value``".

TODO If field is an array there can be multiple values for a field and only one needs to match.  This info
might not be important to include this early in the docs but thought I would include in case helpful.

.. operator:: $lte

   The :operator:`$lte` comparison operator provides the ability to select
   documents where a field is less than or equal to (e.g. "``<=``") a
   value:

   .. code-block:: javascript

      db.collection.find( { field: { $lte: value } } );

   This query returns all documents in ``collection`` where the value
   of ``field`` less than or equal to the specified "``value``".

.. operator:: $gte

   The :operator:`$gte` comparison operator provides the ability to select
   documents where a field is greater than or equal to (e.g. "``>=``") a
   value:

   .. code-block:: javascript

      db.collection.find( { field: { $gte: value } } );

   This query returns all documents in ``collection`` where the value
   of ``field`` greater than or equal to the specified "``value``".

You may combine comparison operators to specify ranges:

.. code-block:: javascript

   db.collection.find( { field: { $gt: value1, $lt: value2 } } );

This statement returns all documents with ``field`` between
"``value1``" and "``value2``".

TODO Also matches if query is { $gt:0, $lt:2 } and doc is { field: [-1,3] }.


Document
~~~~~~~~

.. operator:: $all

   The :operator:`$all` operator matches a minimum set of elements that must
   be present in a document's ``field``, as in the following example:

   .. code-block:: javascript

      db.collection.find( { field: { $all: [ 1, 2 , 3 ] } } );

   This returns all documents in ``collection`` where the value of
   ``field`` is an array that is equivalent to or a superset of "``[
   1, 2, 3, ]``". The :operator:`$all` operator will not return any arrays
   that are subsets; for example, the above query matches "``{ field: [
   1, 2, 3, 4] }``" but not "``{ field: [ 2, 3 ] }``".

TODO Typically arrays aren't treated as sets - this is a bit special for us - might want to call out
this behavior specifically.

.. operator:: $exists

   The :operator:`$exists` operator tests documents for the existence
   of a field. The :operator:`$exists` operator accepts either true and
   false values. For example:

   .. code-block:: javascript

        db.collection.find( { field: { $exists: true } );

   returns all documents in ``collection`` that have ``field``, while:

   .. code-block:: javascript

      db.collection.find( { field: { $exists: false } );

   returns all documents in ``collection`` that do *not* have ``field``
   specified.

.. operator:: $ne

   The :operator:`$ne` operator returns documents where a field is not
   equal to the specified value. The following command:

   .. code-block:: javascript

      db.collection.find( { field: { $ne: 100 } } );

   returns all documents in ``collection`` with ``field`` that does not
   equal 100.

.. operator:: $in

   The :operator:`$in` operator allows you to specify a set of possible
   matches for any value. Consider the following form:

   .. code-block:: javascript

      db.collection.find( { field: { $in: array } } );

   Here, :operator:`$in` returns all documents in ``collection`` where
   ``field`` has a value included in ``array``. This is analogous to
   the ``IN`` modifier ??? in SQL. For example:

   .. code-block:: javascript

      db.collection.find( { age: { $in: [ 1, 2, 3, 5, 7, 11 } } );

   returns all documents in ``collection`` with an "``age``" field
   that is one of the first six prime numbers.

.. operator:: $nin

   The :operator:`$nin` operator provides a "not in," as the inverse of
   :operator:`$in`. For example:

   .. code-block:: javascript

      db.collection.find( { age: { $nin: [ 3, 5, 7 } } );

   returns all documents in ``collection`` where the value of ``age``
   is *not* 3, 5, or 7.

.. _geolocation-operators:

Geolocation
~~~~~~~~~~~

TOOD Call out specific requirements for geo searches.  A geo index must be created.

.. operator:: $near

   The :operator:`$near` operator takes an argument, coordinates in
   the form of "``[x, y]``", and returns a list of objects sorted
   by distance from those coordinates. See the following example:

   .. code-block:: javascript

      db.collection.find( { location: { $near: [100,100] } } );

   This query will return 100 ordered records with a ``location``
   field in ``collection``. Specify a different limit using the
   :func:`limit()`, or another :ref:`geolocation operator
   <geolocation-operators>` to limit the results of the query.

TODO can also specify a non geo operator to filter the results.

.. operator:: $maxDistance

   The :operator:`$maxDistance` operator specifies an upper bound to limit
   the results of a geolocation query. See below, where the
   :operator:`$maxDistance` operator narrows the results of the
   :operator:`$near` query:

   .. code-block:: javascript

      db.collection.find( { location: { $near: [100,100], $maxDistance: 10 } } );

   This query will return documents with ``location`` fields from
   ``collection`` that have values with a distance of 5 or fewer units
   from the point ``[100,100]``. :operator:`$near` returns results
   ordered by their distance from ``[100,100]``. This operation will
   return the first 100 results unless you modify the query with the
   :func:`limit()` method.

   Specify the value of the :operator:`$maxDistance` argument in the
   same units as the document coordinate system.

.. operator:: $within

   The :operator:`$within` operator allows you to select items that exist
   within a shape on a coordinate system. This operator uses the
   following syntax:

   .. code-block:: javascript

      db.collection.find( { location: { $within: { shape } } } );

   Replace ``{ shape }`` with a document that describes a shape. The
   :operator:`$within` command supports three shapes. These shapes and the
   relevant expressions follow:

   - Rectangles. Use the :operator:`$box` shape, consider the following
     variable and :operator:`$within` document:

     .. code-block:: javascript

        db.collection.find( { location: { $within: { $box: [[100,0], [120,100]] } } } );

     Here a box, "``[[100,120], [100,0]]``" describes the parameter
     for the query. As a minimum, you must specify the lower-left and
     upper-right corners of the box.

TODO be more explicit about what the box parameters mean.

   - Circles. Specify circles in the following form:

     .. code-block:: javascript

        db.collection.find( { location: { $within: { $circle: [ center, radius } } } );

   - Polygons. Specify polygons with an array of points. See the
     following example:

     .. code-block:: javascript

        db.collection.find( { location: { $within: { $box: [[100,120], [100,100], [120,100], [240,200]] } } } );

     The last point of a polygon is implicitly connected to the first
     point.

   All shapes include the border of the shape as part of the shape,
   although this is subject to the imprecision of floating point
   numbers.

.. operator:: $uniqueDocs

   When using the :dbcommand:`geoNear`, if document contains more than
   one field with coordinate values, MongoDB will return the same
   document multiple times. When using the :operator:`$within`,
   however, MongoDB provides opposite behavior: if a document contains
   more than one field with coordinate values, MongoDB will only
   return the document once.

   The :operator:`$uniqueDocs` operator overrides these default
   behaviors.

   By specifying "``$uniqueDocs: false``" in a :operator:`$within`
   query, will cause the query to return a single document multiple
   times if there is more than one match.

   By contrast, if you specify "``uniqueDocs: true``" as an option to
   the a :dbcommand:`geoNear` command, then :dbcommand:`geoNear` only
   returns a single document even if there are multiple matches.

   You cannot specify :operator:`$uniqueDocs` with :operator:`$near`
   queries.

TODO And not with haystack either I don't think.

Logical
~~~~~~~

.. operator:: $or

   .. present in versions greater than 1.6

TODO I think >= 1.6 but not sure

   The :operator:`$or` operator provides a Boolean ``OR`` expression in
   queries. Use :operator:`$or` to match documents against two or more
   expressions. For example:

   .. code-block:: javascript

      db.collection.find( { $or [ { key1: value1 }, { key2: value2} ] } );

   returns all documents in ``collection`` that *either* have a
   ``key1`` field with ``value1`` *or* a ``key2`` field with ``value2``.

   You may specify a field and then use the :operator:`$or` operator to
   further narrow results. Consider the following:

   .. code-block:: javascript

      db.collection.find( { age: "19", $or [ { key1: value1 }, { key2: value2} ] } );

   This query returns all documents in ``collection`` with an ``age``
   field that has the value ``19``, and *either* a ``key1`` field with
   ``value1`` *or* a ``key2`` field with ``value2``.

   .. versionadded: 2.0
      You may nest :operator:`$or` operations; however, these
      expressions are not as efficiently optimized as top-level
      :operator:`$or` operations.

.. operator:: $nor

   The :operator:`$nor` operators provides a Boolean ``NOR`` expression in
   queries. :operator:`$nor` is the functional inverse of :operator:`$or`. Use
   :operator:`$nor` to exclude documents that have fields with specific
   values. For example:

   .. code-block:: javascript

      db.collection.find( { $nor [ { key1: value1 }, { key2: value2} ] } );

   returns all documents in ``collection`` that have *neither* a
   ``key1`` field with ``value1`` *nor* a ``key2`` field with
   ``value2``.

.. operator:: $and

   .. versionadded:: 2.0

   The :operator:`$and` operator provides a Boolean ``AND`` expression in
   queries. Use :operator:`$and` to return the documents that satisfy *all*
   included expressions. For example:

   .. code-block:: javascript

      db.collection.find( { $and [ { key1: value1 }, { key2: value2} ] } );

   returns all documents in ``collection`` that have *both* a
   ``key1`` field with ``value1`` *and* a ``key2`` field with
   ``value2``.

.. operator:: $not

   :operator:`$not` is a meta operator used to reverse the operation
   of a standard operator. If a document does not match a query statement,
   passing that query statement to the :operator:`$not` will return
   that document. The operation of :operator:`$not` is consistent with
   the behavior of other operators, but may yield unexpected results
   with some data types, like arrays.

   :operator:`$not` only affects *other operators*, and is unable to
   check fields and documents independently. Use :operator:`$ne` to
   test the contents of fields directly and :operator:`$nor` for
   logical disjunctions.

   Consider the following example of :operator:`$not`:

   .. code-block:: javascript

      db.collection.find( { field: { $not: { $type: 2 } } } );

TODO $type hasn't been introduced yet.

   This query returns all documents in ``collection`` where ``field``
   is *not* a string, using the :operator:`$type` operator.

   .. note::

      The :operator:`$not` operator does not support operations with
      :operator:`$regex`.

      When using :operator:`$not`, pass all regular expressions using
      the native BSON type. For example, consider the following
      expression fragment  in Python, using the PyMongo driver:

      .. code-block:: python

        { "$not": re.compile("acme.*corp")}

Element
~~~~~~~

.. operator:: $type

   The :operator:`$type` operator matches field values with a specific data
   type. :operator:`$type` operator allows you to narrow results based on any
   :term:`BSON` type. For example:

   .. code-block:: javascript

        db.collection.find( { field: { $type: 2 } } );

   returns all documents in ``collection`` where the value of
   ``field`` is a string. Consider the following chart for the
   available types and their corresponding numbers.

   =======================  ==========
   **Type**                 **Number**
   -----------------------  ----------
   Double                       1
   String                       2
   Object                       3
   Array                        4
   Binary data                  5
   Object id                    7
   Boolean                      8
   Date                         9
   Null                        10
   Regular Expression          11
   JavaScript                  13
   Symbol                      14
   JavaScript (with scope)     15
   32-bit integer              16
   Timestamp                   17
   64-bit integer              18
   Min key                    255
   Max key                    127
   =======================  ==========

.. operator:: $regex

   The :operator:`$regex` operator provides regular expression capabilities in
   queries. The following examples are equivalent:

   .. code-block:: javascript

      db.collection.find( { field: /acme.*corp/i } );
      db.collection.find( { field: { $regex: 'acme.*corp', $options: 'i' } } );

   These expressions match all documents in ``collection`` where the
   value of ``field`` matches the case-insensitive regular expression
   "``acme.*corp``".

   :operator:`$regex` uses "Perl Compatible Regular Expressions" (PCRE) as the
   matching engine. This provides four option flags:

   - ``i`` toggles case insensitivity, and allows all letters in the
     pattern to match upper and lower cases.

   - ``m`` toggles multiline regular expression. Without this option,
     all regular expression match within one line.

     If there are no newline characters (e.g. "``\n``") or no
     start/end of line construct, the ``m`` option has no effect.

   - ``x`` toggles an "extended" capability. When set,
     :operator:`$regex` ignores all white space characters unless
     escaped or included in a character class.

     Additionally, it ignores characters between an un-escaped ``#``
     character and the next new line, so that you may include comments
     in complicated patterns. This only applies to data characters;
     white space characters may never appear within special character
     sequences in a pattern.

     The ``x`` option does not affect the handling of the VT character
     (i.e. code 11.)

   - ``s`` allows the dot (e.g. "``.``") character to match all
     characters *including* newline characters.

     .. versionadded:: 1.9.0

   :option:`$regex` only provides the ``i` and ``m`` options in the
   short JavaScript syntax (i.e. "``/acme.*corp/i``"). To use "``x``
   and "``s``" you must use the ":operator:`$regex`" operator with the
   ":operator:`$options`" syntax.

   To combine a regular expression match with other operators, you
   need to specify the ":operator:`$regex`" operator. For example:

   .. code-block:: javascript

      db.collection.find( { field: $regex: /acme.*corp/i, $nin: [ 'acmeblahcorp' } );

TODO or you can use $and

   This expression returns all instances of ``field`` in
   ``collection`` that match the case insensitive regular expression
   "``acme.*corp``" that *don't* match "``acmeblahcorp``".

   :operator:`$regex` uses :term:`indexes <index>` only when the
   regular expression has an anchor for the beginning (i.e. "``^``")
   or end (i.e "``$``") of a string. Additionally, while "``/^a/``",
   "``/^a.*/``", and "``/^a.*$/``" are equivalent, they have different
   performance characteristics. All of these expressions use an index
   if an appropriate index exists; however, "``/^a.*/``", and
   "``/^a.*$/``" are slower becasue they have to scan the entire
   string. "``/^a/``" can stop scanning after matching the prefix.

TODO anchor at the end won't use an index.
TODO I think the part about scanning the whole string might not be right.  I'd just say /^a/ is faster.

.. operator:: $mod

   The :operator:`$mod` operator performs a fast "modulo" query, to
   reduce the need for expensive :operator:`$where` operator in some
   cases. :operator:`$mod` performs a modulo operation on the value of
   a field, and returns all documents that with the specified remainder value. For
   example:

TODO $where not introduced yet

   .. code-block:: javascript

      db.collection.find( { field: { $mod: [ d, m ] } } );

   returns all documents in ``collection`` with a remainder of ``m``,
   with a divisor of ``d``. This replaces the following
   :operator:`$where` operation:

   .. code-block:: javascript

      db.collection.find( "field % d == m" );

JavaScript
~~~~~~~~~~

.. operator:: $where

   Use the :operator:`$where` operator to pass a string containing a
   JavaScript expression to the query system to provide greater
   flexibility with queries. Consider the following:

   .. code-block:: javascript

      db.collection.find( { $where: "this.a > 3" } );

   In this case, the following query is equivalent to the following
   operation using the :operator:`$gt`:

   .. code-block:: javascript

      db.collection.find( { a : { $gt: 3 } } );

TODO provide an example that can't be accomplished with normal operators, eg this.a == this.b

Array
~~~~~

.. operator:: $size

   The :operator:`$size` operator matches any array with the specified
   number of arguments. For example:

   .. code-block:: javascript

      db.collection.find( { field: { $size: 2 } } );

   returns all documents in ``collection`` where ``field`` is an array
   with two or more elements. For instance, the above expression will
   return "``{ field: [ red, green ] }``" and "``{ field: [ apple,
   lime ] }``" but *not* "``{ field: fruit }``" or "``{ field: [
   orange, lemon, grapefruit ] }``". To match fields with only one
   element use :operator:`$size` with a value of 1, as follows:

TODO Might want to state explicitly it's only one element within an array.

   .. code-block:: javascript

      db.collection.find( { field: { $size: 1 } } );

   :operator:`$size` does not accept ranges of values. To select
   documents based on fields with different numbers of elements,
   create a counter field that you increment when you add elements to
   a field.

   Queries cannot use indexes for the :operator:`$size` portion of a
   query, although the other portions of a query can use indexes if
   applicable.

.. operator:: $elemMatch

   The :operator:`$elemMatch` operator matches more than one component within
   an array element. For example,

   .. code-block:: javascript

      db.collection.find( { array: { $elemMatch: { value1: 1, value2: { $gt: 1 } } } } );

   returns all documents in ``collection`` where the array ``array``
   satisfies all of the conditions in the :operator:`$elemMatch`
   expression, or where the value of ``value1`` is 1 and the value of
   ``value2`` is greater than 1. Matching arrays must match all
   specified criteria.

TODO The point here is that there must be one element of array that matches all the operators.  So
this would not match

{ array: [ { value1:1, value2:0 }, { value1:2, value2:2 } ] }

but this would

{ array: [ { value1:1, value2:0 }, { value1:1, value2:2 } ] }


   .. versionadded:: 1.4

.. _update-operators:

Update
------

.. operator:: $set

  Use the :operator:`$set` operator to set a particular value. The
  :operator:`$set` operator requires the following syntax:

  .. code-block:: javascript

     db.collection.update( { field: value1 }, { $set: { field1: value2 } } );

  This statement updates in the document in ``collection`` where
  ``field`` matches ``value1`` by replacing the value of the field
  ``field1`` with "``value2``". This operator will add the specified
  field or fields if they do not exist in this document *or* replace
  the existing value of the specified field(s) if they already exist.

.. operator:: $unset

   The :operator:`$unset` operator deletes a particular field. Consider the
   following example:

   .. code-block:: javascript

      db.collection.update( { field: value1 }, { $unset: { field1: "" } } );

   The above example deletes ``field1`` in ``collection`` from
   documents where ``field`` has a value of ``value1``. The value of
   specified for the value of the field in the :operator:`$unset` statement
   (i.e. ``""`` above,) does not impact the operation.

   If documents match the initial query (e.g. "``{ field: value1 }``"
   above) but do not have the field specified in the :operator:`$unset`
   operation, (e.g. "``field1``") there the statement has no effect on
   the document.

.. operator:: $inc

   The :operator:`$inc` operator increments a value by a specified
   amount if field is present in the document. If the field does not
   exist, :operator:`$inc` sets field to the number value. For
   example:

   .. code-block:: javascript

      db.collection.update( { field: value }, { $inc: { field1: amount } } );

   In this example, for all documents in ``collection`` where
   ``field`` has the value ``value``, the value of ``field1``
   increments by the value of ``amount``. Consider the following
   examples:

TODO I don't think it's all documents that get updated just the first (unless multi is specified)

   .. code-block:: javascript

      db.collection.update( { age: 20 }, { $inc: { age: 1 } } );
      db.collection.update( { name: "John" }, { $inc: { age: 1 } } );

   In the first example all documents that have an ``age`` field with
   the value of ``20``, the operation increases ``age`` field by
   one. In the second example, in all documents where the ``name``
   field has a value of "``John``" the operation increases the value
   of the ``age`` field by one.

   :operator:`$inc` accepts positive and negative incremental amounts.

.. operator:: $push

   The :operator:`$push` operator appends a specified value to an array. For
   example:

   .. code-block:: javascript

      db.collection.update( { field: value }, { $push: { field: value1 } } );

   Here, :operator:`$push` appends ``value1`` to the array identified by
   ``value`` in ``field``. Be aware of the following behaviors:

   - If the field specified in the :operator:`$push` statement
     (e.g. "``{ $push: { field: value1 } }``") does not exist in the
     matched document, the operation adds a new field with the
     specified value (e.g. ``value1``) to the matched document.

TODO It adds a new array with the field in it.

   - The operation will fail if the field specified in the :operator:`$push`
     statement is not an array.

TODO Unless it's missing in which case it will not fail.

   - If ``value1`` is an array itself, :operator:`$push` appends the whole array as an
     element in the identified array. To add multiple items to an
     array, use :operator:`$pushAll`.

.. operator:: $pushAll

   The :operator:`$pushAll` operator is similar to the :operator:`$push` but
   adds the ability to append several values to an array at once.

   .. code-block:: javascript

      db.collection.update( { field: value }, { $pushAll: { field1: [ value1, value2, value3 ] } } );

   Here, :operator:`$pushAll` appends the values in "``[ value1, value2,
   value3 ]``" to the array in ``field1`` in the document
   matched by the statement ``{ field: value }`` in ``collection``.

   If you specify a single value, :operator:`$pushAll` will behave as
   :operator:`$push`.

.. operator:: $addToSet

   The :operator:`$addToSet` operator adds a value to an array only *if* the
   value is *not* in the array already. If the value *is* in the
   array, :operator:`$addToSet` returns without modifying the
   array. Otherwise, :operator:`$addToSet` behaves the same as
   :operator:`$push`. Consider the following example:

   .. code-block:: javascript

      db.collection.update( { field: value }, { $addToSet: { field: value1 } } );

   Here, :operator:`$addToSet` appends ``value1`` to the array stored in
   ``field``, *only if* ``value1`` is not already a member of this
   array.

.. operator:: $pop

   The :operator:`$pop` operator removes the first or last element of an
   array. Pass :operator:`$pop` a value of ``1``` to remove the last element
   in an array and a value of ``-1`` to remove the first element of an
   array. Consider the following syntax:

   .. code-block:: javascript

      db.collection.update( {field: value }, { $pop: { field: 1 } } );

   This operation removes the last item of the array in ``field``  in
   the document that matches the query statement "``{ field: value
   }``". The following example removes the *first* item of the same
   array:

   .. code-block:: javascript

      db.collection.update( {field: value }, { $pop: { field: -1 } } );

   Be aware of the following :operator:`$pop` behaviors:

   - The :operator:`$pop` operation fails if ``field`` is not an
     array.

   - :operator:`$pop` will successfully remove the last item in an
     array. ``field`` will then hold an empty array.

   .. versionadded:: 1.1

.. operator:: $pull

   The :operator:`$pull` operator removes a value from an existing
   array. :operator:`$pull` provides the inverse operation of the
   :operator:`$push` operator. Consider the following example:

   .. code-block:: javascript

      db.collection.update( { field: value }, { $pull: { field: value1 } } );

   :operator:`$pull` removes the value ``value1`` from the array in ``field``,
   in the document that matches the query statement "``{ field: valppppue
   }``" in ``collection``.

TODO It is not really the inverse of push.  It removes all occurrences of the specified value1.

.. operator:: $pullAll

   The :operator:`$pullAll` operator removes multiple values from an existing
   array. :operator:`$pullAll` provides the inverse operation of the
   :operator:`$pushAll` operator. Consider the following example:

   .. code-block:: javascript

      db.collection.update( { field: value }, { $pullAll: { field1: [ value1, value2, value3 ] } } );

   Here, :operator:`$pullAll` removes "``[ value1, value2, value3 ]``" from
   the array in ``field1``, in the document that matches the
   query statement "``{ field: value }``" in ``collection``.

.. operator:: $rename

  The :operator:`$rename` operator changes the name of a field. Consider the
  following example:

  .. code-block:: javascript

     db.collection.update( { field: value }, { $rename: { old_field: new_field  } } );

  Here, the :operator:`$rename` operator changes the name of the ``old_field``
  field to ``new_field``, in the document that matches the query "``{
  field: value }``" in ``collection``.

  The :operator:`$rename` operator does not expand arrays or sub-fields to
  find a match for field names (e.g. "``old_field``" in the example
  above.)

TODO It does expand sub documents.

   .. versionadded:: 1.7.2

.. operator:: $bit

   The :operator:`$bit` operator performs a bitwise update of a field. Only
   use this with integer fields. For example:

   .. code-block:: javascript

      db.collection.update( { field: 1 }, { $bit: { field: { and: 5 } } } );

   Here, the :operator:`$bit` operator updates the integer value of the field
   named ``field`` with a bitwise "``and: 5``" operation. This
   operator only works with number types.

.. operator:: $atomic

   In multi-update mode, it's possible to specify an :operator:`$atomic`
   "operator" that allows you to isolate some updates from each
   other. In a global sense this is not atomic, but rather in context
   of this operation. Consider the following example:

TODO Not clear what context of this operation vs global context means.

   .. code-block:: javascript

      db.foo.update( { field1 : 1 , $atomic : 1 }, { $inc : { field2 : 1 } } ,  false , true )

   This example, isolates the "``{ field1 : 1 }``" update from the
   :operator:`$inc` operation that increments the value of ``field2``.

TODO What does that mean?

   .. seealso:: See :func:`update()` for more information about the
      :func:`update()` function.

.. _projection-operators:

Projection
----------

.. operator:: $slice

   The :operator:`$slice` operator controls the number of items of an array
   that a query returns. Consider the following example:

   .. code-block:: javascript

      db.collection.find( { field: value }, { array: {$slice: count } } );

   This operation selects the document ``collection`` identified by a
   field named ``field`` that holds "``value``" and returns the number
   of elements specified by the value of "``count``" from the array
   stored in the "``array``" field. If ``count`` has a value greater
   than the number of elements in ``array`` the query returns all
   elements of the array.

TODO There are other types of arguments, like negative numbers and arrays.
