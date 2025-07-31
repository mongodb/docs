You can use the |fts| ``boolean`` type to index ``true`` and ``false`` 
values. You can query fields of type ``boolean`` using the :ref:`equals
<equals-ref>` and :ref:`in <in-ref>` operators. You can also :ref:`sort
<sort-ref>` by indexed ``boolean`` fields.

You can also use the ``boolean`` type to index:

- Fields whose value is an array of booleans. To learn more, see 
  :ref:`fts-array-ref`.

- Boolean fields inside an array of documents indexed as the
  :ref:`embeddedDocuments <bson-data-types-embedded-documents>` type.

.. include:: /includes/fts/extracts/fts-ib-enable-dynamic-mappings.rst
