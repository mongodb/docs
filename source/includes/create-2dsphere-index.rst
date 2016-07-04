To create a ``2dsphere`` index, use the
:method:`db.collection.createIndex()` method, specifying the location
field as the key and the string literal ``"2dsphere"`` as the
index type:

.. code-block:: javascript

   db.collection.createIndex( { <location field> : "2dsphere" } )

where the ``<location field>`` is a field whose value is either a
:ref:`GeoJSON object <geospatial-geojson>` or, for backwards
compatibility, a :ref:`legacy coordinates pair <geospatial-legacy>`.
