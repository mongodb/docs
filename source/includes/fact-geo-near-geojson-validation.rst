Starting in MongoDB 8.0, :query:`$near`, :query:`$nearSphere`, and 
:pipeline:`$geoNear` validate that the type of the specified 
:ref:`GeoJSON points <geojson-point>` is ``Point``. Any other input 
type returns an error.
