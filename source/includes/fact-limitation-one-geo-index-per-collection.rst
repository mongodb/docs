The :pipeline:`$geoNear` pipeline stage and the deprecated
:dbcommand:`geoNear` command require that a collection have *at most*
only one |first-geo-index| and/or only one |second-geo-index| whereas
:ref:`geospatial query operators <geospatial-query-selectors>` (e.g.
:query:`$near` and :query:`$geoWithin`) permit collections to have
multiple geospatial indexes.

The geospatial index restriction for the command and the pipeline stage
exists because neither the command nor the pipeline stage syntax
includes the location field. As such, index selection among multiple
``2d`` indexes or ``2dsphere`` indexes is ambiguous.

No such restriction applies for :ref:`geospatial query operators
<geospatial-query-selectors>` since these operators take a location
field, eliminating the ambiguity.
