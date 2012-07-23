Representing Coordinate Data
----------------------------

For geospatial indexes, you must model your coordinate data in a field
that holds a 2 dimensional array. The preferred form is:

.. code-block:: javascript

   [ x, y ]

Consistency is crucial: all documents must store the values in the
same order. You may also use an embedded document, as in:

.. code-block:: javascript

   { x: 1, y: 2 }

MongoDB will not read field names in embedded documents, so order is
still important when using this model.

.. note::

   If you use latitude/longitude data as your coordinate system,
   always store latitude values first: MongoDB's :ref:`spherical
   queries <geospatial-query-spherical>` only recognize ``[
   latitude, longitude ]`` ordering.
