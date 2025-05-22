For :ref:`featureCompatibilityVersion <view-fcv>` set to ``"4.4"`` or
greater, MongoDB raises the limit on collection/view
namespace to 255 bytes. For a collection or a view, the namespace includes the
database name, the dot (``.``) separator, and the collection/view
name (e.g. ``<database>.<collection>``),
