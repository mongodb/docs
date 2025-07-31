You can use the |fts| ``document`` type to index fields in objects or
documents. 

.. include:: /includes/fts/extracts/fts-ib-enable-dynamic-mappings.rst

``document`` Type Limitations 
-----------------------------

You can't use the |fts| ``document`` type to index fields in objects 
or documents that are inside an array. Instead, use the |fts| 
:ref:`embeddedDocuments <bson-data-types-embedded-documents>` type to
index fields in objects or documents that are elements of an array.