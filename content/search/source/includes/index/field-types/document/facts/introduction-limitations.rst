You can use the |fts| ``document`` type to index fields in objects or
documents. 

If you enable :ref:`dynamic mappings <static-dynamic-mappings>`, |fts|
automatically indexes all dynamically indexable fields types
in a ``document`` type field. Alternatively, you can configure dynamic
mappings to index only specific field types nested in a ``document``
type field.

You can use the **Visual Editor** or the  **JSON Editor** in the
{+atlas-ui+}, {+atlas-cli+}, {+atlas-admin-api+}, {+mongosh+},
|compass|, or MongoDB drivers to index fields as the |fts-field-type|
type.  

``document`` Type Limitations 
-----------------------------

You can't use the |fts| ``document`` type to index fields in objects 
or documents that are inside an array. Instead, use the |fts| 
:ref:`embeddedDocuments <bson-data-types-embedded-documents>` type to
index fields in objects or documents that are elements of an array.