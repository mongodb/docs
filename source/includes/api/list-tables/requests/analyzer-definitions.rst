.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 10 65

   * - Name
     - Type
     - Necessity
     - Description

   * - ``baseAnalyzer``
     - string
     - Required
     - :ref:`Analyzer <analyzers-ref>` on which the user-defined
       analyzer is based.

   * - ``ignoreCase``
     - boolean
     - Optional
     - Specify whether the index is case-sensitive.

   * - ``maxTokenLength``
     - integer
     - Optional
     - Longest text unit to analyze. |fts| excludes anything longer
       from the index.

   * - ``name``
     - string
     - Required
     - Name of the user-defined analyzer.

   * - ``stemExclusionSet``
     - array of strings
     - Optional
     - Words to exclude from :wikipedia:`stemming </Stemming>`
       by the language analyzer.

   * - ``stopwords``
     - array of strings
     - Optional
     - Strings to ignore when creating the index.

