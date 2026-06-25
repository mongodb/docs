The |fts| |fts-field-type| type takes the following parameters: 

.. list-table::
   :widths: 18 12 8 51 11
   :header-rows: 1

   * - Option
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - string 
     - required
     - Human-readable label that identifies this field type. Value must
       be |data-type|. 
     - 

   * - ``analyzer``
     - string
     - optional
     - Name of the :ref:`analyzer <analyzers-ref>` to use with this 
       autocomplete mapping. You can use any |fts| analyzer except the 
       ``lucene.kuromoji`` :ref:`language analyzer 
       <ref-language-analyzers>` and the following :ref:`custom 
       analyzer <custom-analyzers>` tokenizers and token filters: 

       - :ref:`nGram <nGram-tokenizer-ref>` Tokenizer
       - :ref:`edgeGram <edgeGram-tokenizer-ref>` Tokenizer
       - :ref:`daitchMokotoffSoundex <daitchmokotoffsoundex-tf-ref>` 
         Token Filter
       - :ref:`nGram <ngram-tf-ref>` Token Filter 
       - :ref:`edgeGram <edgegram-tf-ref>` Token Filter 
       - :ref:`shingle <shingle-tf-ref>` Token Filter

     - ``lucene.standard``
      
   * - ``maxGrams``
     - int
     - optional
     - Maximum number of characters per indexed sequence. The 
       value limits the character length of indexed tokens. When you 
       search for terms longer than the ``maxGrams`` value, |fts| 
       truncates the tokens to the ``maxGrams`` length.

       For ``maxGrams`` best practices, see :ref:`autocomplete-maxgrams-config`.

     - ``15``

   * - ``minGrams``
     - int
     - optional
     - Minimum number of characters per indexed sequence. We 
       recommend ``4`` for the minimum value. A value that is less 
       than ``4`` could impact performance because the size of the 
       index can become very large. We recommend the default value of 
       ``2`` for ``edgeGram`` only.
     - ``2``

   * - ``tokenization``
     - enum
     - optional
     - .. _autocomplete-tokenization:
      
       Tokenization strategy to use when indexing the field for 
       autocompletion. Value can be one of the following: 

       - ``edgeGram`` - create indexable tokens, referred to as 
         ``grams``, from variable-length character sequences starting 
         at the left side of the words as delimited by the analyzer 
         used with this autocomplete mapping.

       - ``rightEdgeGram`` -  create indexable tokens, referred to 
         as ``grams``, from variable-length character sequences 
         starting at the right side of the words as delimited by the 
         analyzer used with this autocomplete mapping.

       - ``nGram`` - create indexable tokens, referred to as 
         ``grams``, by sliding a variable-length character window over 
         a word. |fts| creates more tokens for ``nGram`` than 
         ``edgeGram`` or ``rightEdgeGram``. Therefore, ``nGram`` takes 
         more space and time to index the field. ``nGram`` is better 
         suited for querying languages with long, compound words or 
         languages that don't use spaces.

       ``edgeGram``, ``rightEdgeGram``, and ``nGram`` are applied at 
       the letter-level. For example, consider the following sentence: 
         
       .. code-block:: none
          :copyable: false 

          The quick brown fox jumps over the lazy dog. 

       When tokenized with a ``minGrams`` value of ``2`` and a
       ``maxGrams`` value of ``5``, |fts| indexes the following
       sequence of characters based on the ``tokenization`` value
       you choose.

       .. collapsible::
          :heading: edgeGram
          :expanded: false

          .. code-block:: none
             :copyable: false

             th
             the
             the{SPACE}
             the q
             qu
             qui
             quic
             uick
             ...

       .. collapsible::
          :heading: rightEdgeGram
          :expanded: false

          .. code-block:: none
             :copyable: false

             og
             dog
             {SPACE}dog
             y dog
             zy
             azy
             lazy
             {SPACE}lazy
             he
             the
             {SPACE}the
             r the
             er
             ver
             over
             {SPACE}over
             ...

       .. collapsible::
          :heading: nGram
          :expanded: false

          .. code-block:: none
             :copyable: false

             th
             the
             the{SPACE}
             the q
             he
             he{SPACE}
             he q
             he qu
             e{SPACE}
             e q
             e qu
             e qui
             {SPACE}q
             {SPACE}qu
             {SPACE}qui
             {SPACE}quic
             qu
             qui
             quic
             quick
             ...

       For performance considerations, see
       :ref:`autocomplete-tokenization-performance`.

     - ``edgeGram``

   * - ``foldDiacritics``
     - boolean
     - optional
     - Flag that indicates whether to perform :github:`normalizations
       </apache/lucene/blob/main/lucene/analysis/icu/src/java/org/apache/lucene/analysis/icu/ICUFoldingFilter.java#L26-L55>`
       such as including or removing diacritics from the indexed text.
       Value can be one of the following: 

       - ``true`` - perform normalizations such as ignoring diacritic
         marks in the index and query text. For example, a search for
         ``cafè`` returns results with the characters ``cafè`` and
         ``cafe`` because |fts| returns results with and without
         diacritics.  
       - ``false`` - don't perform normalizations such as ignoring
         diacritic marks in the index and query text. So, |fts|
         returns only results that match the strings with or without
         diacritics in the query. For example, a search for ``cafè``
         returns results only with the characters ``cafè``. A search for
         ``cafe`` returns results only with the characters ``cafe``.

     - ``true``

   * - ``similarity.type``
     - string
     - optional
     - Name of the similarity algorithm to use with this string mapping
       when scoring with the :ref:`autocomplete <autocomplete-ref>`
       operator. Value can be one of the following: ``bm25``,
       ``boolean``, or ``stableTfl``. 
       
       To learn more about the available similarity algorithms, see
       :ref:`Score Details <fts-similarity-algorithms>`.       
     - ``bm25``
