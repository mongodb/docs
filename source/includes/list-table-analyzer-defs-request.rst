.. list-table::
   :header-rows: 1
   :widths: 25 15 20 40

   * - Name
     - Type
     - Required/Optional
     - Description

   * - ``name``
     - string
     - Required
     - The name of the user-defined analyzer.

   * - ``baseAnalyzer``
     - string
     - Required
     - The :ref:`analyzer <analyzers-ref>` on which the user-defined
       analyzer is based.

   * - ``maxTokenLength``
     - integer
     - Optional
     - Longest text unit to analyze. Anything longer will not be included
       in the index.

   * - ``stopwords``
     - array of strings
     - Optional
     - Array of strings to ignore when creating the index.

   * - ``ignoreCase``
     - boolean
     - Optional
     - Specify whether the index is case-sensitive.

   * - ``stemExclusionSet``
     - array of strings
     - Optional
     - Array of words to exclude from `stemming
       <https://en.wikipedia.org/wiki/Stemming>`__ by the
       language analyzer.