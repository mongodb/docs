.. list-table:: 
   :header-rows: 1
   :widths: 20 60 20

   * - Field Name 
     - Description 
     - Necessity
     
   * - ``mappings.fields``
     - .. include:: /includes/extracts/fts-field-mappings-fields-json.rst
     - Conditional 

   * - ``storedSource``  
     - .. note:: 

          .. include:: /includes/fact-fts-stored-source-mdb-version.rst
       
       Specify fields in the documents to store on |fts|. Value can be
       one of the following:

       - ``true``, to store all fields  
       - ``false``, to not store any fields 
       - :ref:`Object <fts-stored-source-document>` that specifies the 
         fields to ``include`` or ``exclude`` from storage

       If omitted, defaults to ``false``. To learn more about the 
       syntax and fields, see :ref:`fts-stored-source-definition`.

       .. note:: 

          You can store fields of all supported :ref:`bson-data-chart`
          on |fts|. 
          
     - Optional

   * - ``synonyms`` 
     - .. include:: /includes/extracts/fts-field-synonyms-json.rst
     - Optional 
