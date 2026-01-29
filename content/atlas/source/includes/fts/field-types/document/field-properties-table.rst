Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| ``document`` type takes the following parameters:

.. list-table::
   :widths: 20 12 14 40 10
   :header-rows: 1

   * - Option
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - string
     - Required
     - Human-readable label that identifies the field type.
       Value must be ``document``.
     - 

   * - ``dynamic``
     - boolean or object
     - Optional
     - Flag that indicates whether |fts| recursively indexes all fields 
       and nested documents or object that references the name of the
       field type definition that contains the field types to index.  

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
       individual fields to index separately using the ``fields``
       object. 

       .. include:: /includes/fts/facts/dynamic-flag-considerations.rst

     - false

   * - ``dynamic.typeSet``
     - string
     - Optional
     - Name of the ``typeSet`` array of objects that configures the 
       field types to index. To learn more, see
       :ref:`fts-configure-dynamic-mappings`.

     - 

   * - ``fields``
     - document
     - Optional
     - Document that maps field names to field definitions. To learn 
       more, see an :ref:`example <index-config-example>`. This is 
       required if ``dynamic`` is omitted or set to ``false``. 
     - 

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
