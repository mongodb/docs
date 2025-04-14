When comparing values of different :term:`BSON` types, MongoDB uses the following
comparison order, from lowest to highest:

#. MinKey (internal type)
#. Null
#. Numbers (ints, longs, doubles)
#. Symbol, String
#. Object
#. Array
#. BinData
#. ObjectID
#. Boolean
#. Date, Timestamp
#. Regular Expression
#. MaxKey (internal type)

.. note::

   MongoDB treats some types as equivalent for comparison purposes.
   For instance, numeric types undergo conversion before comparison.
