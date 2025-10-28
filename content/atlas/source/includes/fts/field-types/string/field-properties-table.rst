Configure |fts-field-type| Field Properties  
-------------------------------------------

The |fts| ``string`` type takes the following parameters:

.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Option
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - string
     - Required
     - Human-readable label that identifies this field type.
       Value must be ``string``.
     - 

   * - ``analyzer``
     - string
     - Optional
     - Name of a built-in or custom :ref:`analyzer 
       <analyzers-ref>` to use for indexing the field. If you don't
       specify a value, inherits an analyzer by default in the following
       order:  
       
       a. The ``analyzer`` option for the :ref:`index
          <ref-index-definitions>` if specified. 
       b. The ``lucene.standard`` analyzer.

     - 

   * - ``searchAnalyzer``
     - string
     - Optional
     - Analyzer to use when querying the field. If you don't specify a
       value, inherits an analyzer by default in the following order: 
       
       a. The ``analyzer`` option for this field if specified.
       b. The ``searchAnalyzer`` option for the :ref:`index
          <ref-index-definitions>` if specified. 
       c. The ``analyzer`` option for the :ref:`index
          <ref-index-definitions>` if specified. 
       d. The ``lucene.standard`` analyzer.

     - 

   * - ``indexOptions``
     - string
     - Optional 
     - Amount of information to store for the indexed 
       field. Value can be one of the following:

       - ``docs`` - Only indexes documents. The frequency and position 
         of the indexed term are ignored. Only a single occurence of 
         the term is reflected in the :ref:`score <scoring-ref>`.
       - ``freqs`` - Only indexes documents and term frequency. The 
         position of the indexed term is ignored. 
       - ``positions`` - Indexes documents, term frequency, and term 
         positions. 
       - ``offsets`` - (Default) Indexes documents, term frequency, 
         term positions, and term offsets. This option is required for 
         :ref:`highlight <highlight-ref>`.

     - ``offsets``

   * - ``store``
     - boolean
     - Optional
     - Flag that indicates whether to store the exact document text as 
       well as the analyzed values in the index. Value can be ``true`` 
       or ``false``. The value for this option must be ``true`` for 
       :ref:`highlight <highlight-ref>`.

       To reduce the index size and performance footprint, we recommend setting ``store`` to ``false``\. 
       To learn more, see :ref:`index-perf`.

     - ``true``

   * - ``ignoreAbove``
     - int
     - Optional
     - Maximum number of characters in the value of the field to 
       index. |fts| doesn't index if the field value is greater than 
       the specified number of characters.
     - 

   * - ``similarity.type``
     - String
     - Optional
     - Name of the similarity algorithm to use with this string mapping
       when scoring with the :ref:`text <text-ref>`, :ref:`phrase
       <phrase-ref>`, or :ref:`queryString <querystring-ref>` operators.
       Value can be one of the following: ``bm25``, ``boolean``, or
       ``stableTfl``. 
       
       To learn more about the available similarity algorithms, see
       :ref:`Score Details <fts-similarity-algorithms>`.
     
     - ``bm25``

   * - ``multi``
     - String Field Definition
     - Optional 
     - String field to index with the name of the alternate 
       analyzer specified in the ``multi`` object. To learn more about 
       specifying the ``multi`` object, see :ref:`ref-multi-analyzers` 
       and an example below.

     - 

   * - ``norms``
     - string
     - Optional
     - String that specifies whether to include or omit the field length in 
       the result when scoring. The length of the field is determined 
       by the number of tokens produced by the analyzer for the field. 
       Value can be one of the following: 
 
       - ``include`` - to include the field length when scoring.
       - ``omit`` - to omit the field length when scoring.
      
       If value is ``include``, |fts| uses the length of the field to 
       determine the higher score when scoring. For example, if two 
       documents match a |fts| query, the document with the shorter 
       field length scores higher than the document with the longer 
       field length.

       If value is ``omit``, |fts| ignores the field length when 
       scoring. 

     - ``include``
