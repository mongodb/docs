MongoDB 5.0 removes the deprecated :doc:`geoHaystack
</core/geohaystack>` index and :dbcommand:`geoSearch` command. Use a
:doc:`2d index </core/2d>` with :pipeline:`$geoNear` or one of the
supported :ref:`geospatial query operators <geospatial-query-selectors>`
instead.

Upgrading your MongoDB instance to 5.0 and setting
:ref:`featureCompatibilityVersion <view-fcv>` to ``5.0`` will delete any
pre-existing :doc:`geoHaystack </core/geohaystack>` indexes.