You can use the |fts| ``geo`` type to index geographic points and shape
coordinates. For this type, the indexed field must be a :ref:`GeoJSON <geospatial-indexes-store-geojson>` object. You can use the :ref:`geoShape <geoshape-ref>` and
:ref:`geoWithin <geowithin-ref>` operators to query indexed fields of type ``geo``.

.. |fts-field-type| replace:: ``geo``

.. include:: /includes/index/shared/facts/fts-configure-dynamic-index.rst 
