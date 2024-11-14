The search index definition takes the following fields:

.. code-block:: javascript

   {
      analyzer: "<analyzer-for-index>", 
      searchAnalyzer: "<analyzer-for-query>", 
      mappings: { 
         dynamic: <boolean>,
         fields: { <field-definition> } 
      },
      analyzers: [ <custom-analyzer> ],
      storedSource: <boolean> | {
         <stored-source-definition>
      },
      synonyms: [ {
         name: "<synonym-mapping-name>",
         source: {
            collection: "<source-collection-name>"
         },
         analyzer: "<synonym-mapping-analyzer>"
      } ]
   }

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 80

   * - Field
     - Type
     - Necessity
     - Description

   * - ``analyzer``
     - string 
     - Optional 
     - Specifies the :ref:`analyzer <analyzers-ref>` to apply to 
       string fields when indexing.
       
       If you omit this field, the index uses the :ref:`standard analyzer
       <ref-standard-analyzer>`.

   * - ``searchAnalyzer``
     - string 
     - Optional
     - Specifies the :ref:`analyzer <analyzers-ref>` to apply to query
       text before the text is searched.
       
       If you omit this field, the index uses the same analyzer specified
       in the ``analyzer`` field.
       
       If you omit both the ``searchAnalyzer`` and the ``analyzer``
       fields, the index uses the :ref:`standard analyzer
       <ref-standard-analyzer>`.

   * - ``mappings``
     - object
     - Required
     - Specifies how to index fields on different paths for this index. 

   * - ``mappings.dynamic``
     - boolean
     - Optional
     - Enables or disables dynamic field mapping for this index.
     
       If set to ``true``, the index contains all fields containing
       :ref:`supported data types <bson-data-chart>`.

       If set to ``false``, you must specify individual fields to index 
       using ``mappings.fields``.

       If omitted, defaults to ``false``.

   * - ``mappings.fields``
     - document
     - Conditional
     - Required only if dynamic mapping is disabled. 
     
       Specifies the fields to index. To learn more, see
       :ref:`fts-field-mappings`. 

   * - ``analyzers``
     - array
     - Optional 
     - Specifies the :ref:`custom-analyzers` to use in this index.

   * - ``storedSource`` 
     - boolean or :ref:`Stored Source Definition  
       <fts-stored-source-definition>` 
     - Optional 
     - Specifies document fields to store for queries performed using
       the :ref:`returnedStoredSource <fts-return-stored-source-option>`
       option.
       
       You can store fields of all :ref:`bson-data-chart` on {+fts+}.
       The ``storedSource`` value can be one of these:

       - ``true``, to store all fields  
       - ``false``, to not store any fields 
       - An :ref:`object <fts-stored-source-document>` that specifies the
         fields to ``include`` or ``exclude`` from storage

       If omitted, defaults to ``false``.

       To learn more, see :ref:`fts-stored-source-definition`.

   * - ``synonyms`` 
     - array of :ref:`Synonym Mapping Definitions <synonyms-ref>`
     - Optional 
     - Specifies synonym mappings to use in your index. Configuring
       synonyms allows you to you index and search for words that have
       the same or a similar meaning.
       
       To learn more, see :ref:`synonyms-ref`.
