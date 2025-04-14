When comparing values of different :ref:`BSON types <bson-types>`,
MongoDB uses the following comparison order, from lowest to highest:

#. MinKey (internal type)
#. Null
#. Numbers (ints, longs, doubles, decimals)
#. Symbol, String
#. Object
#. Array
#. BinData
#. ObjectId
#. Boolean
#. Date
#. Timestamp
#. Regular Expression
#. MaxKey (internal type)
