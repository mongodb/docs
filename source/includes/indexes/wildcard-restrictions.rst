
Wildcard indexes do not support the following index types or index
properties:

- :ref:`2d (Geospatial) indexes <2d-index-internals>`
- :ref:`2dsphere (Geospatial) indexes <2dsphere-index>`
- :ref:`Compound indexes <index-type-compound>`
- :ref:`Hashed indexes <index-type-hashed>`
- :ref:`Time to Live (TTL) indexes <index-feature-ttl>`
- :ref:`Text indexes <index-feature-text>`
- :ref:`Unique indexes <index-type-unique>`

Wildcard indexes are :ref:`sparse <index-type-sparse>`; they don't
index empty fields. Therefore, wildcard indexes cannot support 
querying for documents where a field is ``null`` or does not exist.
