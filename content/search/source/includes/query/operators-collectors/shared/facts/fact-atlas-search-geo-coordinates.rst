When specifying the coordinates to search, longitude must be specified 
first and then the latitude. Longitude values can be between ``-180`` and 
``180``, both inclusive. Latitude values can be between ``-90`` and ``90``, 
both inclusive. Coordinate values can be integers or doubles.

.. note:: 

   |fts| does not support the following: 

   - Non-default coordinate reference system (CRS)
   - Planar XY coordinate system (2 dimensional)
   - Coordinate pairs Point notation (that is, ``pointFieldName: [12, 34]``)
