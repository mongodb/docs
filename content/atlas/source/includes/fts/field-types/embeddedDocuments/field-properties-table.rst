Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| ``embeddedDocuments`` type takes the following parameters: 

.. list-table::
   :widths: 15 10 15 50 10
   :header-rows: 1

   * - Field
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - string
     - Required
     - Human-readable label that identifies the field type.
       Value must be ``embeddedDocuments``.
     - 

   * - ``dynamic``
     - boolean
     - Optional
     - Flag that specifies whether to index every dynamically indexable 
       field in the document. Value can be one of 
       the following: 

       - ``true`` - index all indexable fields.
       - ``false`` - don't index all the indexable fields.

     - ``false``

   * - ``fields``
     - document
     - Optional
     - Fields to index. 
     
       If ``dynamic`` is ``true``, |fts| indexes all indexable fields.
       
       If ``dynamic`` is ``false``, you can specify the fields to index 
       in the field definition for ``fields``.

       |fts| doesn't support indexing facet fields as part of an 
       ``embeddedDocuments`` field.

     - ``{}``
