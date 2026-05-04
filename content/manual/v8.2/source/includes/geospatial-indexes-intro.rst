Geospatial indexes support queries on data stored as :ref:`GeoJSON
<geospatial-geojson>` objects or :ref:`legacy coordinate pairs
<geospatial-legacy>`. You can use geospatial indexes to improve
performance for queries on geospatial data or to run certain 
geospatial queries.

MongoDB provides two types of geospatial indexes:

- :ref:`2dsphere-index`, which support queries that interpret 
  geometry on a sphere.

- :ref:`2d-index`, which support queries that interpret geometry 
  on a flat surface.