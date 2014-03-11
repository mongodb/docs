Error Output
------------

The method can return the following errors when it encounters incompatibility issues:

- Index Key Exceed Limit

  .. code-block:: none

     Document Error: key for index '<indexName>' (<indexSpec>) too long on document: <doc>

  To resolve, remove the document. Ensure that the query to remove the
  document does not specify a condition on the invalid field(s).

- Documents with Illegal Field Names

  .. code-block:: none

     Document Error: document is no longer valid in 2.6 because <errmsg>: <doc>

  To resolve, remove the document and re-insert with the appropriate corrections.

- Index Specification Invalid

  .. code-block:: none

     Index Error: invalid index spec for index '<indexName>': <indexSpec>

  To resolve, remove the invalid index and recreate with a valid index
  specification.

- Missing ``_id`` index

  .. code-block:: none

     Collection Error: lack of _id index on collection: <collectionName>

  To resolve, create a unique index on ``_id``.
