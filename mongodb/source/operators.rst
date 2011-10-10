==========================
MongoDB Operator Reference
==========================

.. default-domain: mongodb
.. highlight_language: javascript
.. highlight:: javascript

This document contains a reference to all :term:`operators` used with
MongoDB in version |version|.

TODO possibly develop more clear examples for collection field, field1, value, value1 etc. This gets confusing, but needs to be consistent and generic.

Query Selectors
---------------

Comparison Operators
~~~~~~~~~~~~~~~~~~~~

.. describe:: $lt

   The ``$lt`` comparison operator provides the ability to select
   documents where a field is less than (e.g. "``<``") a value: ::

       db.collection.find( { field: { $lt: value } } );

   This query returns all documents in ``collection`` where the value
   of ``field`` less than the specified "``value``".

.. describe:: $gt

   The ``$gt`` comparison operator provides the ability to select
   documents where a field is greater than (e.g. "``>``") a value: ::

       db.collection.find( { field: { $gt: value } } );

   This query returns all documents in ``collection`` where the value
   of ``field`` greater than the specified "``value``".

.. describe:: $lte

   The ``$lte`` comparison operator provides the ability to select
   documents where a field is less than or equal to (e.g. "``<=``") a
   value: ::

       db.collection.find( { field: { $lte: value } } );

   This query returns all documents in ``collection`` where the value
   of ``field`` less than or equal to the specified "``value``".

.. describe:: $gte

   The ``$gte`` comparison operator provides the ability to select
   documents where a field is less than or equal to (e.g. "``>=``") a
   value: ::

       db.collection.find( { field: { $lte: value } } );

   This query returns all documents in ``collection`` where the value
   of ``field`` less than or equal to the specified "``value``".

Comparison operators can be combined to specify ranges: ::

     db.collection.find( { field: { $gt: value1, $lt: value2 } } );

This statement returns all instances of ``field`` between
"``value1``" and "``value2``".

Document Operators
~~~~~~~~~~~~~~~~~~

.. describe:: $all

   The ``$all`` operator matches a minimum set of elements that must
   be present in a document's ``field``, as in the following example: ::

        db.collection.find( { field: { $all: [ 1, 2 , 3 ] } } );

   This returns all documents in ``collection`` where the value of
   ``field`` is an array that is equivalent to or a superset of "``[
   1, 2, 3, ]``". The ``$all`` operator will not return any arrays
   that are subset; for example, the above query matches "``{ field: [
   1, 2, 3, 4] }``" but not "``{ field: [ 2, 3 ] }``".

.. describe:: $exists

   The ``$exist`` operator returns documents if they have, or lack, a
   field. The ``$exist`` operator accepts either true and false
   values. For example: ::

        db.collection.find( { field: { $exists: true } );

   returns all documents in ``collection`` that have ``field``, while ::

        db.collection.find( { field: { $exists: false } );

   returns all documents in ``collection`` that *not* have a ``field``
   specified.

.. describe:: $ne

   The ``$ne`` operator returns documents where a field is not equal
   to the specified values. The following command: ::

        db.collection.find( { field: { $ne: 100 } } );

   returns all documents in ``collection`` with ``field`` that do not
   equal 100.

.. describe:: $in

   The ``$in`` operator allows you to specify an array of possible
   matches for any value. Consider the following form: ::

        db.collection.find( { field: { $in: array } } );

   Here, ``$in`` returns all documents in ``collection`` where
   ``field`` has a value included in ``array``. This is analogous to
   the ``IN`` modifier in SQL. For example: ::

        db.collection.find( { age: { $in: [ 1, 2, 3, 5, 7, 11 } } );

   returns all documents in ``collection`` with an "``age``" field
   that has a value in one of the first six prime numbers.

.. describe:: $nin

   The ``$nin`` operator provides a "not in," as the inverse of
   :operator:`$in`. For example: ::

        db.collection.find( { age: { $nin: [ 3, 5, 7 } } );

   returns all documents in ``collection`` where the value of ``age``
   is *not* 3, 5, or 7.


.. _geolocation-operators:

Geolocation Operators
~~~~~~~~~~~~~~~~~~~~~

.. describe:: $near

   The ``$near`` operator takes an argument, coordinates in the form
   of "``[x, y]``", and returns a list of objects that sorted by
   distance from those coordinates. See the following example: ::

        db.collection.find( { location: { $near: [100,100] } } );

   This query will return 100 ordered records with a ``location``
   field in ``collection``. Specify a different using the :ref:`limit
   method <limit-method>`, or another :ref:`geolocation operator  <geolocation-operators>`
   to limit the results of the query.

.. describe:: $maxDistance

   The ``$maxDistance`` operator specifies an upward bound to limit
   the results of a geolocation query. See below, where the
   ``$maxDistance`` command narrows the results of the
   :operator:`$near` query: ::

        db.collection.find( { location: { $near: [100,100], $maxDistance: 10 } } );

   This query will return, documents with ``location`` fields from
   ``collection`` that have values with a distance of 5 or fewer units
   from the point ``[100,100]``. These results are ordered by their
   distance from ``[100,100]``, and the first 100 results are returned
   unless the :ref:`limit method <limit-method>` is used.

   The value of the ``$maxDistance`` argument is specified in the same
   units as the document coordinate system.

.. describe:: $within

   The ``$within`` operator allows you to select items that exist
   within a shape on a coordinate system. This operator uses the
   following syntax: ::

        db.collection.find( { location: { $within: { *shape* } } } );

   Replace ``*shape*`` with a document that describes a shape. The
   ``$within command supports three shapes. These shapes and the
   relevant expression follow:

   - Rectangles. Use the ``$box`` shape, consider the following
     variable and ``$within`` document: ::

        db.collection.find( { location: { $within: { $box: [[100,0], [120,100]] } } } );

     Here a box, "``[[100,120], [100,0]]``" describes the parameter
     for the query. As a minimum, you must specify the lower-left and
     upper-right corners of the box.

   - Circles. Specify circles in the following form: ::

        db.collection.find( { location: { $within: { $circle: [ center, radius } } } );

   - Polygons. Polygons are specified by an array of points. See the
     following example: ::

        db.collection.find( { location: { $within: { $box: [[100,120], [100,100], [120,100], [240,200]] } } } );

     The last point of a polygon is implicitly connected to the first
     point.

   All shapes include the border of the shape as part of the shape,
   although this is subject to the imprecision of floating point
   numbers.

.. describe:: $uniqueDocs

   When using the :command:`geoNear`, if document contains more than
   one field with coordinate values, MongoDB will return the same
   document multiple times. When using the :operator:`$within`,
   however, MongoDB returns opposite behavior.

   The ``$uniqueDocs`` operator oerrides these default behaviors. By
   specifying "``$uniqueDocs: false``" in a :operator:`$within`
   query, will cause true ``$within`` queries to return a single
   document multiple times if there is more than one match. By extension
   by specifying "``uniqueDocs: true``" as an option to the
   :command:`geoNear`, this command will only return a single document
   once even if there are multiple matches.

   The ``$uniqueDocs`` operator cannot be specified with
   :operator:`$near` queries.

TODO clarify $uniqueDocs as the wiki is unclear here. The true/false in the wiki seams to not line up with the behavior.

Logical Operators
~~~~~~~~~~~~~~~~~

.. describe:: $or

   .. present in versions greater than 1.6

   The ``$or`` operator provides a Boolean ``OR`` expression in
   queries. Use ``$or`` to match documents against two or more
   expressions. For example: ::

        db.collection.find( { $or [ { key1: value1 }, { key2: value2} ] } );

   returns all documents in ``collection`` that *either* have a
   ``key1`` field with ``value1`` *or* a ``key2`` field with ``value2``.

   You may specify a field and then use the ``$or`` operator to
   further narrow results. Consider the following: ::

        db.collection.find( { age: "19", $or [ { key1: value1 }, { key2: value2} ] } );

   This query returns all documents in ``collection`` with an ``age``
   field that has the value ``19``, and *either* a ``key1`` field with
   ``value1`` *or* a ``key2`` field with ``value2``.

   As of version 2.0 ``$or`` operations can be nested; however, these
   expressions are not as efficiently optimized as top-level ``$or``
   operations.

.. describe:: $nor

   The ``$nor`` operators provides a Boolean ``NOR`` expression in
   queries. ``$nor`` is the functional inverse of ``$nor``. Use
   ``$nor`` to exclude documents that have fields with specific
   values. For example: ::

        db.collection.find( { $nor [ { key1: value1 }, { key2: value2} ] } );

   returns all documents in ``collection`` that have *neither* a
   ``key1`` field with ``value1`` *nor* a ``key2`` field with
   ``value2``.

.. describe:: $and

   The ``$and`` operator provides a Boolean ``AND`` expression in
   queries. Use ``$and`` to return the documents that satisfy *all*
   included expressions. For example: ::

        db.collection.find( { $and [ { key1: value1 }, { key2: value2} ] } );

   returns all documents in ``collection`` that have *both* a
   ``key1`` field with ``value1`` *and* a ``key2`` field with
   ``value2``.

   .. the $and operator was added in version 2.0

.. describe:: $not

   ``$not`` is a meta operator used to negate a standard operator. It
   can only affect other operators, and cannot be used to check fields
   and documents independently. For this functionality see
   :operator:`$ne`. Consider the following statement: ::

        db.collection.find( { field: { $not: { $type: 2 } } } );

   This query returns all documents in ``collection`` where ``field``
   is *not* a string, using the :operator:`$type` operator.

   The ``$not`` operator does not support operations with
   :operator:`$regex`. When using $not, all regular expressions should
   be passed using the native BSON type. For example, consider the
   following expression fragment in Python, using the PyMongo driver: ::

        { "$not": re.compile("acme.*corp")}

Element Operators
~~~~~~~~~~~~~~~~~

.. describe:: $type

   The ``$type`` operator matches field values with a specific data
   type. ``$type`` operator allows you to narrow results based on any
   :term:`BSON` type. For example: ::

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

.. describe:: $regex

   The ``$regex`` operator provides regular expression capabilities in
   queries. The following examples are equivalent: ::

        db.collection.find( { field: /acme.*corp/i } );
        db.collection.find( { field: { $regex: 'acme.*corp', $options: 'i' } } );

   These expressions match all documents in ``collection`` where the
   value of ``field`` matches the case-insensitive regular expression
   "``acme.*corp``".

   ``$regex`` uses perl compatible regular expressions (PCRE) as the
   matching engine. This provides four option flags:

   - ``i`` toggles case insensitivity, and allows all letters in the
     pattern to match upper and lower cases.

   - ``m`` toggles multiline regular expression. Without this option,
     all regular expression match within one line.

     If there are no newline characters (e.g. "``\n``") or no
     start/end of line construct, the ``m`` option has no effect.

   - ``x`` toggles an "extended" capability. When set, all white space
     characters are ignored unless escaped or included in a character
     class.

     Additionally, characters between an unescaped ``#``
     character and the next new line are ignored, so that you may
     include comments in complicated patterns. This only applies to
     data characters; white space characters may never appear within
     special character sequences in a pattern.

     The ``x`` option does not effect the way that the VT character
     (i.e. code 11) is handled.

   - ``s`` allows the dot (e.g. "``.``") character to match all
     characters *including* newline characters.

     .. the ``s`` option was added in version 1.9.0.

   Only the ``i` and ``m`` options can be used in the short JavaScript
   syntax (i.e. "``/acme.*corp/i``"). To use "``x`` and "``s``" you
   must use the "``$regex``" operator with the "``$options``" syntax.

   To combine a regular expression match with other operators, you
   need to specify the "``$regex``" operator. For example: ::

        db.collection.find( { field: $regex: /acme.*corp/i, $nin: [ 'acmeblahcorp' } );

   This expression returns all instances of ``field`` in
   ``collection`` that match the case insensitive regular expression
   "``acme.*corp``" that *don't* match "``acmeblahcorp``".

.. describe:: $mod

   The ``$mod`` operator performs a fast "modulo" query, to reduce the
   need for expensive :operator:`$where` operator in some
   cases. ``$mod`` performs a modulo operation on the value of a
   field, and returns all documents that with that modulo value. For
   example: ::

        db.collection.find( { field: { $mod: [ d, m ] } } );

   returns all documents in ``collection`` with a modulo of ``m``,
   with a divisor of ``d``. This replaces the following
   :operator:`$where` operation: ::

        db.collection.find( "field % d == m" );

Array Operators
~~~~~~~~~~~~~~~

.. describe:: $size

   The ``$size`` operator matches any array with the specified number
   of arguments. For example: ::

        db.collection.find( { field: { $size: 2 } } );

   returns all documents in ``collection`` where ``field`` is an array
   with two or more elements. For instance, the above expression will
   return "``{ field: [ red, green ] }``" and "``{ field: [ apple,
   lime ] }``" but *not* "``{ field: fruit }``" or "``{ field: [
   orange, lemon, grapefruit ] }``". To match fields with only one
   element use ``$size`` with a value of 1, as follows: ::

        db.collection.find( { field: { $size: 1 } } );

   ``$size`` does not accept ranges of values. To select documents
   based on fields with different numbers of elements, create a
   counter field that you increment when you add elements to a field.

   Indexes cannot be used for the $size portion of a query, although
   the other portions of a query can use indexes if applicable.

.. describe:: $elemMatch

   The ``$elemMatch`` operator matches more than one component within
   an array. For example,

        db.collection.find( { array: { $elemMatch: { value1: 1, value2: { $gt: 1 } } } } );

   returns all documents in ``collection`` where the array ``array``
   satisfies all of the conditions in the ``$elemMatch`` expression,
   or where the value of ``value1`` is 1 and the value of ``value2``
   is greater than 1. Matching arrays must match all specified
   criteria.

   .. $elemMatch was introduced in version 1.4.

Update Operators
----------------

TODO does update() iterate over the whole collection or just the first matching record?

.. describe:: $set

  Use the ``$set`` operator to set a particular value. The ``$set``
  operator requires the following syntax: ::

        db.collection.update( { field: value1 }, { $set: { field1: value2 } } );

  In this statement, the document(s) in ``collection`` where ``field``
  matches ``value1``, the ``field1`` is added or updated with
  the value ``value2``. This operator will add the specified field or
  fields if they do not exist in this document *or* replace the
  existing value of the specified field(s) if they already exist.

.. describe:: $unset

   The ``$unset`` operator deletes a particular field. Consider the
   following example: ::

        db.collection.update( { field: value1 }, { $unset: { field1: "" } } );

   The above example deletes ``field1`` in ``collection`` from
   documents where ``field`` has a value of ``value1``. The value of
   specified for the value of the field in the ``$unset`` statement
   (i.e. ``""`` above,) does not impact the operation.

   If documents match the initial query (e.g. "``{ field: value1 }``"
   above) but do not have the field specified in the ``$unset``
   operation, (e.g. "``field1``") there the statement has no effect on
   the document.

.. describe:: $inc

   The ``$inc`` operator increments a value by a specified amount if
   field is present in the document. If the field does not exist,
   ``$inc`` sets field to the number value. For example: ::

        db.collection.update( { field: value }, { $inc: { field1: amount } } );

   In this example, for all documents in ``collection`` where
   ``field`` has the value ``value``, the value of ``field1``
   is incremented by ``amount``. Consider the following examples:
   ::

        db.collection.update( { age: 20 }, { $inc: { age: 1 } } );
        db.collection.update( { name: "John" }, { $inc: { age: 1 } } );

   In the first example all documents that have an ``age`` field with
   the value of ``20``, the ``age`` field is increased by one. In the
   second example, all documents where the ``name`` field has a value
   of "``John``", the value of the ``age`` field is increased by one.

   ``$inc`` accepts positive and negative incremental amounts.

.. describe:: $push

   The ``$push`` operator appends a specified value to an array. For
   example: ::

        db.collection.update( { field: value }, { $push: { field: value1 } } );

   Here, ``$push`` appends ``value1`` to the array identified by
   ``value`` in ``field``. Be aware of the following behaviors:

   - If the field specified in the ``$push`` statement (e.g. "``{
     $push: { field: value1 } }``") does not exist in the matched
     document, a new field with the specified value (e.g. ``value1``)
     will be added to the matched document.

   - The operation will fail if the field specified in the ``$push``
     statement is not an array.

   - If ``value`` is an array itself, an array will be appended as an
     element in the identified array. To add multiple items to an
     array, use :operator:`$pushAll`.

.. describe:: $pushAll

   The ``$pushAll`` operator is similar to the :operator:`$push` but
   adds the ability to append several values to an array at once.

        db.collection.update( { field: value }, { $pushAll: { field1: [ value1, value2, value3 ] } } );

   Here, ``$pushAll`` appends the values in "``[ value1, value2,
   value3 ]``" to the array in ``field1`` in the document
   matched by the statement ``{ field: value }`` in ``collection``.

   If you specify a single value, ``$pushAll`` will behave as
   :operator:`$push`.

TODO determine what the performance impacts of using $pushAll with single values are.

.. describe:: $addToSet

   The ``$addToSet`` operator adds a value to an array only *if* the
   value is *not* in the array already. If the value *is* in the
   array, ``$addToSet`` returns without modifying the
   array. Otherwise, ``$addToSet`` behaves the same as
   :operator:`$push`. Consider the following example: ::

        db.collection.update( { field: value }, { $addToSet: { field: value1 } } );

   Here, ``$addToSet`` appends ``value1`` to the array stored in
   ``field``, *only if* ``value1`` is not already a member of this
   array.

.. describe:: $pop

   The ``$pop`` operator removes the first or last element of an
   array. Pass ``$pop`` a value of ``1``` to remove the last element
   in an array and a value of ``-1`` to remove the first element of an
   array. Consider the following syntax: ::

        db.collection.update( {field: value }, { $pop: { field: 1 } } );

   Here, the last item of the array stored in ``field`` is removed in
   the document that matches the query statement "``{ field: value
   }``". In the following example, the *first* item of the same array
   is removed: ::

        db.collection.update( {field: value }, { $pop: { field: -1 } } );

   Be aware of the following ``$pop`` behaviors:

   - The ``$pop`` operation fails if ``field`` is not an array.

   - ``$pop`` will successfully remove the last item in an
     array. ``field`` will then hold an empty array.

   .. $pop was added in version 1.1

.. describe:: $pull

   The ``$pull`` operator removes a value from an existing
   array. ``$pull`` provides the inverse operation of the
   :operator:`$push` operator. Consider the following example: ::

        db.collection.update( { field: value }, { $pull: { field: value1 } } );

   ``$pull`` removes the value ``value1`` from the array in ``field``,
   in the document that matches the query statement "``{ field: valppppue
   }``" in ``collection``.

.. describe:: $pullAll

   The ``$pullAll`` operator removes multiple values from an existing
   array. ``$pullAll`` provides the inverse operation of the
   ``$pushAll`` operator. Consider the following example: ::

        db.collection.update( { field: value }, { $pullAll: { field1: [ value1, value2, value3 ] } } );

   Here, ``$pullAll`` removes "``[ value1, value2, value3 ]``" from
   the array in ``field1``, in the document that matches the
   query statement "``{ field: value }``" in ``collection``.

.. describe:: $rename

  The ``$rename`` operator changes the name of a field. Consider the
  following example: ::

        db.collection.update( { field: value }, { $rename: { old_field: new_field  } } );

  Here, the ``$rename`` operator changes the name of the ``old_field``
  field to ``new_field``, in the document that matches the query "``{
  field: value }``" in ``collection``.

  The ``$rename`` operator does not expand arrays or sub-fields to
  find a match for field names (e.g. "``old_field``" in the example
  above.)

   .. $rename was added for version 1.7.2

.. describe:: $bit

   The ``$bit`` operator performs a bitwise update of a field. This
   operator can only be used with integer fields. For example, ::

        db.collection.update( { field: 1 }, { $bit: { field: { and: 5 } } } );

   the ``$bit`` operator updates the integer value of the filed named
   ``field`` with a bitwise "``and: 5``" operation.

TODO expand coverage of $bit which I need to understand the use better.

Projection Operators
--------------------

.. describe:: $slice

   The ``$slice`` operator controls the number of items of an array
   that a query returns. Consider the following example: ::

        db.collection.find( { field: value }, { array: {$slice: count } } );

   Here, we select the document in ``collection`` identified by the
   value ``value`` in ``field``, and return the number
   of elements specified by ``count`` from the array stored in the
   ``array`` field. If ``count`` has a value greater than the number
   of elements in ``array`` then all elements of the array are
   returned.
