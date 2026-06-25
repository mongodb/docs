.. include:: /includes/shared/facts/fact-autocomplete-field-type.rst 

You can also use the |fts-field-type| type to index:

- Fields whose value is an array of strings. To learn more, see 
  :ref:`fts-array-ref`.

- String fields inside an array of documents indexed as the
  :ref:`embeddedDocuments <bson-data-types-embedded-documents>` type.
  For index build time considerations, see
  :ref:`autocomplete-index-build-time`.

For dynamic mapping considerations, see
:ref:`autocomplete-dynamic-mappings`.
