.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Name

     - Description

   * - :query:`$geoIntersects`

     - Selects geometries that intersect with a :term:`GeoJSON` geometry.
       The :ref:`2dsphere <2dsphere-index>` index supports
       :query:`$geoIntersects`.
   

   * - :query:`$geoWithin`

     - Selects geometries within a bounding :ref:`GeoJSON geometry
       <geospatial-indexes-store-geojson>`. The :ref:`2dsphere
       <2dsphere-index>` and :ref:`2d <2d-index>` indexes support
       :query:`$geoWithin`.
   

   * - :query:`$near`

     - Returns geospatial objects in proximity to a point.
       Requires a geospatial index. The ``2dsphere``
       and ``2d`` indexes support :query:`$near`.
   

   * - :query:`$nearSphere`

     - Returns geospatial objects in proximity to a point on a sphere.
       Requires a geospatial index. The ``2dsphere``
       and ``2d`` indexes support :query:`$nearSphere`.