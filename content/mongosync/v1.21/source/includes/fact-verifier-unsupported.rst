The verifier doesn't check the following namespaces: 

- Capped collections
- Collections with TTL indexes, including TTL indexes that are added or dropped
  during migration
- Collections that don't use the default collation

To verify unsupported collections, add additional script code to examine
the collections. For more information, see :ref:`c2c-verification`.