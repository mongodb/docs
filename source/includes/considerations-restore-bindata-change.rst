Per a change to the `BSON specification <http://bsonspec.org/spec.html>`_, 
the BSON binary datatype (``BinData``) now defaults to a different
subtype. The Backup Agent automatically detects and converts backup
data in ``BinData`` subtype 2, the deprecated format, to ``BinData``
subtype 0, the new default format. If your application code expects
``BinData`` subtype 2, you must update it to work with ``BinData`` subtype
0.

.. seealso::
   The notes on the `BSON specification
   <http://bsonspec.org/spec.html>`_ explain the particular specifics
   of this change.