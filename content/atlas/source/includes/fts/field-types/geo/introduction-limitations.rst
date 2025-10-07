You can use the |fts| ``geo`` type to index geographic points and shape
coordinates. For this type, the indexed field must be a :manual:`GeoJSON
</reference/geojson/>` object. You can use the :ref:`geoShape <geoshape-ref>` and
:ref:`geoWithin <geowithin-ref>` operators to query indexed fields of type ``geo``.

.. |fts-field-type| replace:: ``geo``

.. include:: /includes/fts/extracts/fts-configure-dynamic-index.rst 
