The verifier doesn't check the following namespaces: 

- Capped collections
- Collections with TTL indexes, including TTL indexes that are added or dropped
  during migration
- Collections that don't use the default collation
- Views

The verifier doesn't check the following collection features:

- Collection metadata
- Indexes

To verify the above data and metadata, script additional checks
for these collections and collection features. For more
information, see :ref:`c2c-verification`.