.. list-table:: 
   :header-rows: 1
   :widths: 20 15 15 50

   * - Field 
     - Type 
     - Necessity 
     - Description

   * - ``exact``
     - Boolean
     - Optional 
     - This is required if ``numCandidates`` is omitted. 

       Flag that specifies whether to run |enn| or |ann| search. Value
       can be one of the following: 

       - ``false`` - to run |ann| search 
       - ``true`` - to run |enn| search

       If omitted, defaults to ``false``. 

       .. include:: /includes/avs/shared/avs-requirements-cluster-version-ann-enn.rst
       
       To learn more about these search types, see
       :ref:`vectorSearch-agg-pipeline`.

   * - ``filter``
     - Object
     - Optional
     - :abbr:`MQL (MongoDB Query Language)` expression that
       compares an indexed field to use as a pre-filter. 
       You can filter on {+avs-filter-types+}.

       To learn which MQL operators {+avs+} supports
       in your filter, see :ref:`vectorSearch-agg-pipeline-filter`.

   * - ``index`` 
     - String 
     - Required 
     - Name of the {+avs+} index to use.
        
       {+avs+} doesn't return results if you misspell the index name or 
       if the specified index doesn't already exist on the {+cluster+}.

   * - ``limit`` 
     - Int 
     - Required 
     - Number (of type ``int`` only) of documents to return in the
       results. This value can't exceed the value of ``numCandidates`` if
       you specify ``numCandidates``.

   * - ``model``
     - String 
     - Optional
     - Name of the embedding model to use for generating embeddings 
       for the query string. The embedding model must be compatible with 
       the embedding model specified in the index definition for the field 
       against which you want to run the query. All the models in the 
       ``voyage-4`` family of models are compatible with each other, but 
       the ``voyage-code-3`` is not compatible with the other models.
       
       Value can be one of the following: 

       - ``voyage-4-large`` - Highest-quality retrieval across languages 
         and domains.
       - ``voyage-4`` - Balanced model for multilingual use and 
         general-purpose retrieval accuracy. (Recommended)
       - ``voyage-4-lite`` - Lightweight, faster model optimized for 
         latency and lower cost.
       - ``voyage-code-3`` - Optimized for code retrieval. This embedding 
         model is not compatible with ``voyage-4-large``, ``voyage-4``, 
         and ``voyage-4-lite`` embedding models. Therefore, this model can't 
         be used if you indexed the field using the other supported embedding 
         models.
     
       If omitted, defaults to the embedding model specified in the index 
       definition. 
       
       If you want to query using the ``queryVector`` parameter, you **must** 
       omit this field.

   * - ``numCandidates``
     - Int 
     - Conditional 
     - This field is required if ``exact`` is ``false`` or omitted.
        
       Number of nearest neighbors to use during the search. Value must 
       be less than or equal to (``<=``) ``10000``. You can't specify a
       number less than the number of documents to return (``limit``).
        
       We recommend that you specify a number at least 20 times higher than the 
       number of documents to return (``limit``) to increase accuracy.
        
       This overrequest pattern is the recommended way to 
       trade off latency and :term:`recall` in your |ann| searches, 
       and we recommend tuning this parameter based on your specific dataset 
       size and query requirements.

       To learn more about other variables that might impact this
       parameter, see :ref:`avs-num-candidates`. 

   * - ``path``
     - String 
     - Required 
     - Indexed :ref:`autoEmbed <avs-types-auto-embed>` type field to search.

   * - ``query``
     - Object 
     - Optional 
     - Object that specifies the query context. {+avs+} supports ``text`` 
       query. This is mutually exclusive with ``queryVector``.

   * - | ``query.``
       | ``text``
     - String 
     - Required
     - Query text for which you want to perform the semantic search. {+avs+} 
       automatically generates vector embeddings for the specified text 
       using the ``model`` specified in the query or in the index definition. 
       The embedding model specified in the query takes precedence.

   * - ``queryVector``
     - Array of Numbers 
     - Optional 
     - Array of vector embeddings or floating point numbers generated using 
       a |voyage| embedding model to perform a semantic search. To retrieve 
       correct results, you must use a |voyage| embedding model that is 
       compatible with the |voyage| embeddings model specified in the index 
       definition for the field that you want to query. 
       
       This is mutually exclusive with ``model`` and ``query``. 