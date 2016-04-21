Per a change to the `BSON specification <http://bsonspec.org/spec.html>`_, 
the BSON binary datatype (`BinData`) now defaults to a different
subtype. MongoDB 3.0 and greater automatically detects and converts
backup data in `BinData` subtype 2, the old default format, to
`BinData` subtype 0, the new default format. If your application code
expects `BinData` subtype 2, you must update it to handle `BinData`
subtype 0.

.. seealso::
   The notes on the `BSON specification
   <http://bsonspec.org/spec.html>`_ explain the particular specifics
   of this change.