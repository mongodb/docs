.. include:: /includes/fts/facts/fact-autocomplete-field-type.rst 

You can also use the |fts-field-type| type to index:

- Fields whose value is an array of strings. To learn more, see 
  :ref:`fts-array-ref`.

- String fields inside an array of documents indexed as the
  :ref:`embeddedDocuments <bson-data-types-embedded-documents>` type.

.. tip:: 
  
   If you have a large number of documents and a wide range of data 
   against which you want to run |fts| queries using the 
   :ref:`autocomplete <autocomplete-ref>` operator, building this index can take 
   some time. Alternatively, you can create a separate index with only 
   the ``autocomplete`` type to reduce the impact on other indexes and 
   queries while the index builds. 

   To learn more, see |fts| :ref:`Index Performance Considerations
   <index-size-and-config>`. 

.. include:: /includes/fts/extracts/fts-configure-dynamic-index.rst 
    