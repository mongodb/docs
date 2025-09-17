For applications that rely heavily on MongoDB :query:`$text` and
:query:`$regex` queries, use the following recommendations to determine
whether to refactor your applications or migrate your applications to
|fts| :pipeline:`$search`. The ``$search`` aggregation pipeline stage
provides features that are either not available through the MongoDB
operators or are available through the MongoDB operators but not as
performant as |fts| ``$search``.

The following table shows how MongoDB :query:`$regex`, :query:`$text`,
and |fts| :pipeline:`$search` address your application's requirements. 

.. list-table:: 
   :widths: 40 10 60 
   :header-rows: 1

   * - If your application requires... 
     - Use...
     - Because...

   * - Datastore to respect write concerns
     - :query:`$regex`
     - For transactions with heavy reads after writes, we recommend
       :query:`$regex`. For :pipeline:`$search`, reads after writes
       should be rare.  

   * - Cluster optimized for write performance
     - :pipeline:`$search`
     - |fts| indexes don't degrade {+cluster+} write performance.

   * - Searching through large data sets
     - :pipeline:`$search`
     - |fts| uses an inverted index, which enables fast document retrieval
       at very large scales.

   * - Language awareness 
     - :pipeline:`$search`
     - |fts| supports many :ref:`language analyzers
       <ref-language-analyzers>` that can tokenize (create searchable
       terms) languages, remove stopwords, and interpret diacritics for
       improved search relevance.

   * - Case-insensitive text search
     - :pipeline:`$search`
     - :pipeline:`$search` offers more capabilities than
       :query:`$regex`. 

   * - Highlighting result text
     - :pipeline:`$search`
     - |fts| :ref:`highlighting <highlight-ref>` allows you to
       contextualize the documents in the results, which is essential
       for natural language queries.

   * - Geospatial-aware search queries
     - :query:`$regex` or :pipeline:`$search`
     - MongoDB :query:`$regex` and |fts| :pipeline:`$search` treat
       geospatial parameters differently. In MongoDB, lines between
       coordinates are spherical, which is well-suited for coordinates
       for long distance such as air flight. |fts| uses Lucene, which
       draws a straight line between coordinates and is well-suited
       for short distance.

   * - Autocompletion of search queries
     - :pipeline:`$search`
     - For :ref:`autocomplete <autocomplete-ref>` of characters (nGrams), |fts|
       includes ``edgeGrams`` for left-to-right autocomplete, ``nGrams``
       for autocomplete of languages that don't have whitespace, and
       ``rightEdgeGram`` for autocomplete of languages that you write
       and read right-to-left. 
       
       For :ref:`autocomplete <autocomplete-ref>` of words (wordGrams), |fts| includes
       :ref:`shingle-tf-ref` token filter, which supports word-based
       autocomplete by concatenating adjacent words to create a single
       token.

   * - Fuzzy matching on text input 
     - :pipeline:`$search`
     - |fts| :ref:`text <text-ref>` and :ref:`autocomplete <autocomplete-ref>` operators
       support ``fuzzy`` matching to filter on input text and address
       misspelled words (typos).

   * - Filtering based on multiple strings
     - :pipeline:`$search`
     - |fts| :ref:`compound <compound-ref>` supports filtering based on multiple
       strings.

   * - Relevance score sorted search 
     - :pipeline:`$search`
     - |fts| uses the `BM25 algorithm
       <https://en.wikipedia.org/wiki/Okapi_BM25>`__ for determining
       the search relevance score of documents. It supports advanced
       configuration through :ref:`scoring-boost` expressions like
       multiply and gaussian decay, as well as analyzers, search
       operators, and synonyms. To learn more, see
       :ref:`compound-query-custom-score-tutorial`.

   * - Partial indexes 
     - :pipeline:`$search`
     - |fts| supports partial indexing by using a View with a ``$match`` expression. To learn
       more, see :ref:`Example: Filter Documents<partially-indexed-collection>`.


   * - Patial match
     - :pipeline:`$search`
     - |fts| :ref:`wildcard <wildcard-ref>` and :ref:`autocomplete <autocomplete-ref>` operators
       support partial match queries.

   * - Single compound index on arrays
     - :pipeline:`$search`
     - |fts| term indexes are intersected in a single |fts| index and 
       eliminate the need for compound indexes for filtering on arrays.

   * - Synonyms search
     - :pipeline:`$search`
     - |fts| supports :ref:`synonyms <synonyms-ref>` defined in a
       separate collection, which you can reference in your search index
       for use. To learn more, see the :ref:`synonyms-tutorial` tutorial.

   * - Faceting for counts
     - :pipeline:`$search`
     - |fts| provides fast :ref:`counts <count-ref>` of documents based
       on text criteria, and also supports :ref:`faceted
       <fts-facet-ref>` search for numbers and dates. To learn more, see
       :ref:`facet-tutorial`. 

   * - Extract metadata
     - :pipeline:`$search`
     - |fts| :ref:`fts-facet-ref` collector returns metadata and doesn't
       require you to run multiple queries for retrieving metadata. To
       learn more, see the :ref:`facet-tutorial` tutorial.

   * - Custom analyzers 
     - :pipeline:`$search`
     - |fts| supports :ref:`custom analyzers <custom-analyzers>` to suit
       your specific indexing requirements. For example, you can index
       and search email addresses and |http| or |https| |url|\s using
       custom analyzers.

   * - Searching phrases or multiple words
     - :pipeline:`$search`
     - |fts| :ref:`phrase <phrase-ref>` operator supports searching for a
       sequence of terms. 

   * - Searching with regular expression
     - :pipeline:`$search`
     - |fts| provides improved performance when you use the |fts|
       :ref:`autocomplete <autocomplete-ref>` operator instead.

.. seealso:: 

   - :ref:`text-to-search` - describes how you can replace
     :query:`$text` aggregation pipeline stage in your query with
     :pipeline:`$search` to improve both the flexibility and performance
     of these queries.  
   - :ref:`regex-to-search` - describes how you can replace
     inefficient regex matching with :pipeline:`$search` to improve the
     performance of text queries. 