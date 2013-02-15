.. versionchanged:: 2.2.3
   Before 2.2.3, a geospatial index *must* exist on a field holding
   coordinates before using any of the geolocation query
   operators. After 2.2.3, applications may use geolocation query
   operators *without* having a geospatial index; however, geospatial
   indexes will support much faster geospatial queries than the
   unindexed equivalents.

.. note::

   A geospatial index *must* exist on a field and the field must hold coordinates
   before you can use any of the geolocation query operators.
