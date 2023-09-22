Wildcard indexes do not support:

- :ref:`2d (Geospatial) indexes <2d-index-internals>`
- :ref:`2dsphere (Geospatial) indexes <2dsphere-index>`
- :ref:`Hashed indexes <index-type-hashed>`
- :ref:`Time to Live (TTL) indexes <index-feature-ttl>`
- :ref:`Text indexes <index-feature-text>`
- :ref:`Unique indexes <index-type-unique>`

Wildcard indexes are :ref:`sparse <index-type-sparse>` indexes. They do
not support queries when an indexed field does not exist. A wildcard
index will index the document if the wildcard field has a ``null``
value.

Starting in MongoDB 7.0, wildcard indexes support ascending (``1``) and
descending (``-1``) sort order. Earlier versions only supported
ascending order.
