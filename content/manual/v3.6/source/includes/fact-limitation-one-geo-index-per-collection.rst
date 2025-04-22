The :dbcommand:`geoNear` command and the :pipeline:`$geoNear` pipeline
stage require that a collection have *at most* only one
|first-geo-index| and/or only one |second-geo-index| whereas
:ref:`geospatial query operators <geospatial-query-selectors>` (e.g.
:query:`$near` and :query:`$geoWithin`) permit collections to have
multiple geospatial indexes. 

The geospatial index restriction for the :dbcommand:`geoNear` command
and the :pipeline:`$geoNear` pipeline stage exists because neither the
:dbcommand:`geoNear` command nor the :pipeline:`$geoNear` pipeline
stage syntax includes the location field. As such, index selection
among multiple ``2d`` indexes or ``2dsphere`` indexes is ambiguous.

No such restriction applies for :ref:`geospatial query operators
<geospatial-query-selectors>` since these operators take a location
field, eliminating the ambiguity.
