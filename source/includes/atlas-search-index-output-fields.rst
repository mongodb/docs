.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Field
     - Type
     - Description

   * - ``analyzer``
     - string
     - Name of the analyzer to use when creating the index. Value 
       can be one of the following: 

       - :atlas:`lucene.standard </reference/atlas-search/analyzers/standard/>`
       - :atlas:`lucene.simple </reference/atlas-search/analyzers/simple/>`
       - :atlas:`lucene.whitespace 
         </reference/atlas-search/analyzers/whitespace/>`
       - :atlas:`lucene.language </reference/atlas-search/analyzers/language/>`
       - :atlas:`lucene.keyword </reference/atlas-search/analyzers/keyword/>`

   * - ``collectionName``
     - string
     - Name of the collection.

   * - ``database``
     - string
     - Name of the database that contains the collection.

   * - ``indexID``
     - string
     - Unique identifier of the |fts| index.

   * - ``mappings``
     - document
     - Static or dynamic field mappings for the |fts| index. 

   * - ``mappings.dynamic``
     - string
     - Whether the |fts| index uses dynamic field mappings. Value can be 
       one of the following: 

       - ``true`` if the ``dynamic`` flag is set, indicating dynamic field 
         mappings.
       - ``false`` if the ``dynamic`` flag is not set, indicating static field 
         mappings.

   * - ``mappings.fields``
     - document or array of documents
     - List of indexed fields.    

   * - ``mappings.fields.[n].type``
     - string
     - Data type of the indexed field.

   * - ``name``
     - string
     - Name of the index. 

   * - ``searchAnalyzer``
     - string
     - Name of the analyzer to use when searching the indexed field. Value 
       can be one of the following: 

       - :atlas:`lucene.standard </reference/atlas-search/analyzers/standard/>`
       - :atlas:`lucene.simple </reference/atlas-search/analyzers/simple/>`
       - :atlas:`lucene.whitespace 
         </reference/atlas-search/analyzers/whitespace/>`
       - :atlas:`lucene.language </reference/atlas-search/analyzers/language/>`
       - :atlas:`lucene.keyword </reference/atlas-search/analyzers/keyword/>`
