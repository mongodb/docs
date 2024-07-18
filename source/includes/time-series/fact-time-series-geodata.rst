Time series collections only support the :pipeline:`$geoNear` aggregation
stage for sorting :ref:`geospatial data <geospatial-queries>` from queries
against :ref:`2dsphere <2dsphere-index>` indexes. The :query:`$near` and 
:query:`$nearSphere` operators are not supported.