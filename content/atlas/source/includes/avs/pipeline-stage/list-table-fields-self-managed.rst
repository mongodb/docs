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
     - Indexed :ref:`vector <avs-types-vector>` type field to search.

   * - ``queryVector``
     - Array of Numbers 
     - Required 
     - Array of numbers of ``float32``, |bson|
       :manual:`BinData </reference/method/BinData/>` vectors with subtype
       ``float32``, or |bson| :manual:`BinData </reference/method/BinData/>` 
       vectors with subtype ``int1`` or ``int8`` type that represent the
       query vector. 

       To learn more about generating |bson| ``binData``
       vectors with subtype ``float32``, ``int8``, ``int1``,
       see :ref:`avs-bindata-vector-subtype`. 

       The array size must match the number of vector ``dimensions`` 
       specified in the :ref:`index definition <avs-types-vector-search>`  
       for the field. 

       You must embed your query with the same model that you used to
       embed the data.

       You can query your embeddings with full-fidelity vectors,
       as long as the vector subtype is the same. This is only possible with
       ``binData`` vectors with subtype ``float32``. If you use any other
       subtype (``int8`` or ``int1``), {+avs+} doesn't return any results or errors.

   * - ``explainOptions``
     - Object
     - Optional 
     - Trace a list of vectors (identified by theirs ``_id``) in an
       :ref:`explain <avs-explain-ref>` ``executionStats`` query. You
       can't use this option without ``explain``. To learn more, see
       :ref:`avs-explain-ref`. 

   * - | ``explainOptions.``
       | ``traceDocumentIds``
     - Array of objectIDs
     - Required 
     - List of document ``_id``\s.