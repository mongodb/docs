.. order-of-document-fields

MongoDB preserves the order of the document fields following write
operations *except* for the following cases:

- The ``_id`` field is always the first field in the document.

- Updates that include :update:`renaming <$rename>` of field names may
  result in the reordering of fields in the document.

.. versionchanged:: 2.6

   Starting in version 2.6, MongoDB actively attempts to preserve the
   field order in a document. Before version 2.6, MongoDB did not
   actively preserve the order of the fields in a document.
