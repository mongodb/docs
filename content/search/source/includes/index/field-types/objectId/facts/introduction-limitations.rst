You can use the |fts| ``objectId`` type to index :manual:`ObjectId
</reference/bson-types/#objectid>` values. You can query fields of type
``objectId`` using the :ref:`equals <equals-ref>` and :ref:`in <in-ref>`
operators. 

You can also use the ``objectId`` type to index:

- Fields whose value is an array of ``objectId``. To learn more, see 
  :ref:`fts-array-ref`.

- ``objectId`` fields inside an array of documents indexed as the
  :ref:`embeddedDocuments <bson-data-types-embedded-documents>` type.

To facet on ``objectId`` values, use :ref:`MongoDB View
<fts-transform-documents-collections>` to convert the value to ``string``
type. For a demonstration of transforming an ``objectId`` type to
``string`` type for faceting, see :ref:`fts-transform-for-facet`.

.. include:: /includes/index/shared/facts/fts-ib-enable-dynamic-mappings.rst