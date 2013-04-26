.. versionchanged:: 2.2.3
   Applications can use |operator| *without* having a geospatial
   index. However, geospatial indexes support much faster queries than
   the unindexed equivalents. Before 2.2.3, a geospatial index *must*
   exist on a field holding coordinates before using any of the
   geospatial query operators.
