When comparing values of different :term:`BSON` types, MongoDB uses
the following comparison order, from lowest to highest:

#. MinKey (internal type)
#. Null
#. Numbers (ints, longs, doubles)
#. Symbol, String
#. Object
#. Array
#. BinData
#. ObjectId
#. Boolean
#. Date, Timestamp
#. Regular Expression
#. MaxKey (internal type)

MongoDB treats some types as equivalent for comparison purposes. For
instance, numeric types undergo conversion before comparison.

The comparison treats a non-existent field as it would an empty BSON
Object. As such, a sort on the ``a`` field in documents ``{ }`` and ``{
a: null }`` would treat the documents as equivalent in sort order.

With arrays, a less-than comparison or an ascending sort compares the
smallest element of arrays, and a greater-than comparison or a
descending sort compares the largest element of the arrays. As such,
when comparing a field whose value is a single-element array (e.g. ``[
1 ]``) with non-array fields (e.g. ``2``), the comparison is between
``1`` and ``2``. A comparison of an empty array (e.g. ``[ ]``) treats
the empty array as less than ``null`` or a missing field.
