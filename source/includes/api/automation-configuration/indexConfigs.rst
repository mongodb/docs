The **indexConfigs** array is optional and defines indexes to be built for specific replica sets.

.. code-block:: json
   :linenos:

   "indexConfigs": [{
     "key": [
       ["<string>", "<value>"]
     ],
     "rsName": "<string>",
     "dbName": "<string>",
     "collectionName": "<string>",
     "collation": {
       "locale": "<string>",
       "caseLevel": <boolean>,
       "caseFirst": "<string>",
       "strength": <number>,
       "numericOrdering": <boolean>,
       "alternate": "<string>",
       "maxVariable": "<string>",
       "normalization": <boolean>,
       "backwards": <boolean>
     },
     "options": {
       "<key>": "<value>"
     }
   }]

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - indexConfigs
     - array of objects
     - Optional
     - Specific indexes to be built for specific replica sets.

   * - indexConfigs.key
     - array of arrays
     - Required
     - Keys in the index. This "array of arrays" contains a single
       array if the index has just one key.

   * - indexConfigs.rsName
     - string
     - Required
     - Replica set on which MongoDB builds the index.

   * - indexConfigs.dbName
     - string
     - Required
     - Database that MongoDB indexes.

   * - indexConfigs.collectionName
     - string
     - Required
     - Collection that MongoDB indexes.

   * - indexConfigs.collation
     - object
     - Optional
     - Language-specific rules to use when sorting and matching
       strings if the index uses
       :manual:`collation </reference/collation>`.

       If you include the **indexConfigs.collation** object, you must
       include the **indexConfigs.collation.locale** parameter. All
       other parameters are optional.

       If you don't include the **indexConfigs.collation** object, the
       index can't include collation.

   * - indexConfigs.collation.locale
     - string
     - Required
     - Locale that the `ICU <http://site.icu-project.org/>`_ defines.

       The MongoDB Server Manual lists the supported locales in its
       :manual:`Collation Locales and Default Parameters section </reference/collation-locales-defaults>`.

       To specify simple binary comparison, set this value to
       **simple**.

   * - indexConfigs.collation.caseLevel
     - boolean
     - Optional
     - Flag that indicates how the index uses case comparison.

       If you set this parameter to **true**, the index uses case
       comparison.

       This parameter applies only if you set
       **indexConfigs.collation.strength** to **1** or **2**.

       .. seealso:: :manual:`Collation </reference/collation>`

   * - indexConfigs.collation.caseFirst
     - string
     - Optional
     - Sort order of case differences during tertiary level
       comparisons.

       .. include:: /includes/api/facts/collation-values-in-manual.rst

   * - indexConfigs.collation.strength
     - number
     - Optional
     - Level of comparison to perform. Corresponds to
       `ICU Comparison Levels <http://userguide.icu-project.org/collation/concepts#TOC-Comparison-Levels>`_.

       .. include:: /includes/api/facts/collation-values-in-manual.rst

   * - indexConfigs.collation.numericOrdering
     - boolean
     - Optional
     - Flag that indicates how to compare numeric strings.

       .. list-table::
          :widths: 10 45 45
          :header-rows: 1
          :stub-columns: 1

          * - Value
            - Collation Method
            - Example

          * - true
            - numeric strings compared as numbers
            - **10** > **2**.

          * - false
            - numeric strings compared as strings
            - **10** < **2**.

       The default is **false**.

       .. seealso:: :manual:`Collation </reference/collation>`

   * - indexConfigs.collation.alternate
     - string
     - Optional
     - Setting that determines how collation should consider whitespace
       and punctuation as base characters during comparisons.

       .. include:: /includes/api/facts/collation-values-in-manual.rst

   * - indexConfigs.collation.maxVariable
     - string
     - Optional
     - Characters the index can ignore. This parameter applies only if
       **indexConfigs.collation.alternate** is set to **shifted**.

       .. include:: /includes/api/facts/collation-values-in-manual.rst

   * - indexConfigs.collation.normalization
     - boolean
     - Optional
     - Flag that indicates if the text should be normalized.

       If you set this parameter to **true**, collation:

       - Checks if text requires `normalization <http://userguide.icu-project.org/collation/concepts#TOC-Normalization>`_.
       - Performs normalization to compare text.

       The default is **false**.

       .. seealso:: :manual:`Collation </reference/collation>`

   * - indexConfigs.collation.backwards
     - boolean
     - Optional
     - Flag that indicates how the index should handle diacritic
       strings.

       If you set this parameter to **true**, strings with diacritics
       sort from the back to the front of the string.

       The default is **false**.

       .. seealso:: :manual:`Collation </reference/collation>`

   * - indexConfigs.options
     - document
     - Required
     - Index options that the :driver:`MongoDB Go Driver </go>`
       supports.
