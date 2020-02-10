- For :ref:`featureCompatibilityVersion <view-fcv>` set to ``"4.4"`` or
  greater, MongoDB removes the 120 byte limit on collection/view
  namespace. For a collection or a view, the namespace includes the
  database name, the dot (``.``) separator, and the collection/view
  name (e.g. ``<database>.<collection>``),

- For :ref:`featureCompatibilityVersion <view-fcv>` set to ``"4.2"`` or
  earlier, the maximum length of the collection/view namespace remains
  120 bytes.
