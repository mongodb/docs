You can use the |fts| ``objectId`` type to index :manual:`ObjectId
</reference/bson-types/#objectid>` values. You can query fields of type
``objectId`` using the :ref:`equals <equals-ref>` and :ref:`in <in-ref>`
operators. 

You can also use the ``objectId`` type to index:

- Fields whose value is an array of ``objectId``. To learn more, see 
  :ref:`fts-array-ref`.

- ``objectId`` fields inside an array of documents indexed as the
  :ref:`embeddedDocuments <bson-data-types-embedded-documents>` type. 

.. include:: /includes/fts/extracts/fts-ib-enable-dynamic-mappings.rst 