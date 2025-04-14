Starting in MongoDB 4.0, you can specify a ``key`` option to the
:pipeline:`$geoNear` pipeline stage to indicate the indexed field path
to use. This allows the :pipeline:`$geoNear` stage to be used on a
collection that has multiple |first-geo-index| and/or multiple
|second-geo-index|:

- If your collection has multiple |first-geo-index| and/or multiple
  |second-geo-index|, you must use the ``key`` option to specify the
  indexed field path to use.

- If you do not specify the ``key``, you cannot have multiple
  |first-geo-index| and/or multiple |second-geo-index| since without
  the ``key``, index selection among multiple ``2d`` indexes or
  ``2dsphere`` indexes is ambiguous.

.. note::

   If you do not specify the ``key``, and you have at most only one
   |first-geo-index| index and/or only one |first-geo-index| index,
   MongoDB looks first for a ``2d`` index to use. If a ``2d`` index
   does not exists, then MongoDB looks for a ``2dsphere`` index to use.
