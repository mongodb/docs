.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 75

   * - Name
     - Type
     - Description

   * - ``baseAnalyzer``
     - string
     - :ref:`Analyzer <analyzers-ref>` on which the user-defined
       analyzer is based.

   * - ``ignoreCase``
     - boolean
     - Specify whether the index is case-sensitive.

   * - ``maxTokenLength``
     - integer
     - Longest text unit to analyze. |fts| excludes anything longer
       from the index.

   * - ``name``
     - string
     - Name of the user-defined analyzer.

   * - ``stemExclusionSet``
     - array of strings
     - Words to exclude from :wikipedia:`stemming </Stemming>`
       by the language analyzer.

   * - ``stopwords``
     - array of strings
     - Strings to ignore when creating the index.
