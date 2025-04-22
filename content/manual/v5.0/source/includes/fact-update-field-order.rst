.. order-of-document-fields

For write operations, MongoDB preserves the order of the document fields
*except* for the following cases:

- The ``_id`` field is always the first field in the document.

- Updates that include :update:`renaming <$rename>` of field names may
  result in the reordering of fields in the document.
