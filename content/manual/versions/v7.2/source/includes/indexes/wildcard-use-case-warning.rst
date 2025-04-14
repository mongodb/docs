Only use wildcard indexes when the fields you want to index are unknown
or may change. Wildcard indexes don't perform as well as targeted
indexes on specific fields. If your collection contains arbitrary field
names that prevent targeted indexes, consider remodeling your schema to
have consistent field names. To learn more about targeted indexes, see
:ref:`create-indexes-to-support-queries`.
