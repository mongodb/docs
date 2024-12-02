When calculating geospatial results, |fts| :ref:`geoshape-ref` and 
:ref:`geowithin-ref` operators and MongoDB :manual:`$geoIntersects 
</reference/operator/query/geoIntersects/>` operator use different 
geometries. This difference can be seen in how |fts| and MongoDB draw 
polygonal edges. 

|fts| draws polygons based on `Cartesian distance 
<https://en.wikipedia.org/wiki/Cartesian_coordinate_system>`__, which 
is the shortest line between two points in the coordinate reference 
system.

MongoDB draws polygons using the geodesic mode based on 
:manual:`2dsphere indexes </core/indexes/index-types/geospatial/2dsphere>` 
that is built on top of a third-party library for `geodesic types 
<https://s2geometry.io/devguide/basic_types>`__, or the flat mode, from 
:manual:`2d indexes </core/indexes/index-types/geospatial/2d>`. To 
learn more, see :manual:`GeoJSON Objects </reference/geojson/#polygon>`.

|fts| and MongoDB could return different results for geospatial queries 
involving polygons.
