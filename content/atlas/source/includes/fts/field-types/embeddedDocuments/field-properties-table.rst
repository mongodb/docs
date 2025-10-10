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
     - string
     - Required
     - Human-readable label that identifies the field type.
       Value must be ``embeddedDocuments``.
     - 

   * - ``dynamic``
     - boolean or object
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
     - string
     - Optional
     - Name of the ``typeSet`` array of objects that configures the 
       field types to index. To learn more, see
       :ref:`fts-configure-dynamic-mappings`. 

       .. include:: /includes/fts/facts/fact-cdi-preview.rst
     - 

   * - ``fields``
     - document
     - Optional
     - Fields to index. This is required if ``dynamic`` is ``false``.
     
       If ``dynamic`` is ``true``, |fts| indexes all indexable field
       types. You can also independently index individual fields using
       ``fields``. 

       |fts| doesn't support indexing facet fields as part of an 
       ``embeddedDocuments`` field.

     - ``{}``

   * - ``typeSets`` 
     - array of objects
     - Optional 
     - Field types to index automatically using dynamic mappings. To
       learn about the field types that you can configure for dynamic 
       mappings, see :ref:`fts-configure-dynamic-mappings`.
     -

   * - ``typeSets.[n].name`` 
     - string
     - Required 
     - Human-readable label that identifies the configuration for the
       fields types to dynamically index.
     - 

   * - ``typeSets.[n].types`` 
     - array of objects
     - Required 
     - Field types, one per object, to index automatically using dynamic
       mappings. 
     -

   * - ``typeSets.[n].types.[n].type`` 
     - string
     - Required 
     - Field type to automatically index. You can also configure the
       settings for each field type. If you don't configure any
       settings, |fts| uses the default values for the field type. To
       learn more about the field types that you can configure for
       dynamic mapping, see :ref:`fts-configure-dynamic-mappings`. 
     - 
