The `BSON specification <http://bsonspec.org/spec.html>`_ changed the
default subtype for the BSON binary datatype (``BinData``) from ``2``
to ``0``. Some binary data stored in a snapshot may be ``BinData``
subtype 2. The {+bagent+} automatically detects and converts snapshot
data in ``BinData`` subtype 2 to ``BinData`` subtype 0. If your
application code expects ``BinData`` subtype 2, you must update your
application code to work with ``BinData`` subtype 0.

.. seealso::
   
   The notes on the `BSON specification
   <http://bsonspec.org/spec.html>`_ explain the particular specifics
   of this change.
