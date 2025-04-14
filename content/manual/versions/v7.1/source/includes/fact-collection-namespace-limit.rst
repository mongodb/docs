- For :ref:`featureCompatibilityVersion <view-fcv>` set to ``"4.4"`` or
  greater, MongoDB raises the limit for unsharded collections and views to 
  255 bytes, and to 235 bytes for sharded collections. For a collection or 
  a view, the namespace includes the database name, the dot (``.``) 
  separator, and the collection/view name 
  (e.g. ``<database>.<collection>``),

- For :ref:`featureCompatibilityVersion <view-fcv>` set to ``"4.2"`` or
  earlier, the maximum length of unsharded collections and views namespace 
  remains 120 bytes and 100 bytes for sharded collection.
