Time series collections only support the :pipeline:`$geoNear`
aggregation stage for sorting :ref:`geospatial data
<geospatial-queries>` from queries against :ref:`2dsphere
<2dsphere-index>` indexes. You can't use :query:`$near` and
:query:`$nearSphere` operators on time series collections