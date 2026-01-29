Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| ``embeddedDocuments`` type takes the following parameters: 

.. list-table::
   :widths: 20 10 15 40 10
   :header-rows: 1

   * - Field
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - String
     - Required
     - Human-readable label that identifies the field type.
       Value must be ``embeddedDocuments``.
     - 

   * - ``dynamic``
     - Boolean or Object
     - Optional
     - Flag that specifies whether to dynamically index using default
       type set or object that references the name of the configured
       ``typeSet`` that contains the list of field types to dynamically
       index.  
       
       Value must be one of the following: 

       - boolean - set to ``true`` to recursively index all indexable
         field types or set to ``false`` to not dynamically index any of
         the dynamically indexable field types. For the list of field
         types that |fts| dynamically indexes using the default type
         set, see :ref:`fts-enable-dynamic-mappings`. 
       - object - specify the name ``typeSets`` that contains the
         list of field types to index. To learn more, see 
         ``dynamic.typeSet``. 

       If you set this to ``false``, you must specify individual 
       fields to index using ``fields`` object. You can also configure
       individual fields to index separately using the ``fields`` object.
     
     - ``false``

   * - ``dynamic.typeSet``
     - String
     - Optional
     - Name of the ``typeSet`` array of objects that configures the 
       field types to index. To learn more, see
       :ref:`fts-configure-dynamic-mappings`. 

     - 

   * - ``fields``
     - Object
     - Optional
     - Fields to index. This is required if ``dynamic`` is ``false``.
     
       If ``dynamic`` is ``true``, |fts| indexes all indexable field
       types. You can also independently index individual fields using
       ``fields``. 

       |fts| doesn't support indexing facet fields as part of an 
       ``embeddedDocuments`` field.

     - ``{}``

   * - ``storedSource``
     - Boolean or :ref:`Stored Source Definition<fts-stored-source-definition>`
     - Optional
     - Specifies fields in the documents to store for query-time 
       look-ups using the :ref:`returnedStoredSource 
       <fts-return-stored-source-option>` option. You can store fields 
       of all :ref:`bson-data-chart` on |fts|. Value can be one of 
       the following:

       - ``true``, to store all fields  
       - ``false``, to not store any fields 
       - :ref:`Object <fts-stored-source-document>` that specifies 
         the fields to ``include`` or ``exclude`` from storage

       If omitted, defaults to ``false``. 
       
       To learn more, see :ref:`fts-stored-source-definition`.

     - ``false``

   * - ``typeSets`` 
     - Array of Objects
     - Optional 
     - Field types to index automatically using dynamic mappings. To
       learn about the field types that you can configure for dynamic 
       mappings, see :ref:`fts-configure-dynamic-mappings`.
     -

   * - ``typeSets.[n].name`` 
     - String
     - Required 
     - Human-readable label that identifies the configuration for the
       fields types to dynamically index.
     - 

   * - ``typeSets.[n].types`` 
     - Array of Objects
     - Required 
     - Field types, one per object, to index automatically using dynamic
       mappings. 
     -

   * - ``typeSets.[n].types.[n].type`` 
     - String
     - Required 
     - Field type to automatically index. You can also configure the
       settings for each field type. If you don't configure any
       settings, |fts| uses the default values for the field type. To
       learn more about the field types that you can configure for
       dynamic mapping, see :ref:`fts-configure-dynamic-mappings`. 
     - 
