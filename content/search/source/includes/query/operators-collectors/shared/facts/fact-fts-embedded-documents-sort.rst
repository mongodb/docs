To sort the parent documents by an embedded document field, you must do the
following:

- Index the parents of the embedded document child field as the
  :ref:`document <bson-data-types-document>` type. 
- Index the child field with string values within the embedded document 
  as the :ref:`token <bson-data-types-token>` type. For child fields
  with number and date values, enable :ref:`dynamic mapping
  <static-dynamic-mappings>` to index those fields automatically. 

|fts| sorts on parent documents only. It doesn't sort the child fields
within an array of documents. For an example, see :ref:`Sort Example
<embedded-document-query-examples>`.     