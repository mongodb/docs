``wildcardProjection`` works with specifications like:

.. literalinclude:: /includes/driver-examples/mongosh/indexes/wildcard-projection.js
   :language: javascript
   :copyable: false

However, you can't define an index that includes the same field in the
wildcard fields and the regular (non-wildcard) fields. To define the
index correctly, use a ``wildcardProjection`` to exclude duplicated
fields from the wildcard pattern.

``wildcardProjection`` does not work with a specification like:

.. literalinclude:: /includes/driver-examples/mongosh/indexes/wildcard-projection-invalid.js
   :language: javascript
   :copyable: false