.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Name
     - Type
     - Description

   * - ``name``
     - string
     - The name of the user-defined analyzer.

   * - ``baseAnalyzer``
     - string
     - The :ref:`analyzer <analyzers-ref>` on which the user-defined
       analyzer is based.

   * - ``maxTokenLength``
     - integer
     - Longest text unit to analyze. Anything longer will not be included
       in the index.

   * - ``stopwords``
     - array of strings
     - Array of strings to ignore when creating the index.

   * - ``ignoreCase``
     - boolean
     - Specify whether the index is case-sensitive.

   * - ``stemExclusionSet``
     - array of strings
     - Array of words to exclude from `stemming
       <https://en.wikipedia.org/wiki/Stemming>`__ by the
       language analyzer.