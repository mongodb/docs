The ``indexConfigs`` array is optional and defines indexes to be built for specific replica sets.

.. code-block:: cfg

   "indexConfigs" : [
       {
           "key" : [ 
               [ <string> , <val> ],
               ...
           ],
           "rsName" : <string>,
           "dbName" : <string>,
           "collectionName" : <string>
           "collation" : {
               locale : <string>,
               caseLevel : <boolean>,
               caseFirst : <string>,
               strength : <number>,
               numericOrdering : <boolean>,
               alternate : <string>,
               maxVariable : <string>,
               normalization : <boolean>,
               backwards : <boolean>
           },
           "options" : { <key> : <value>, ... }
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - indexConfigs
     - object array
     - *Optional*. Objects that define specific indexes to be built for
       specific replica sets.

   * - indexConfigs.key
     - array of arrays
     - The index's keys. This "array of arrays" contains a single array if
       the index has just one key.

   * - indexConfigs.rsName
     - string
     - The replica set that the index is built on.

   * - indexConfigs.dbName
     - string
     - The database the index applies to.

   * - indexConfigs.collectionName
     - string
     - The collection the index applies to.

   * - indexConfigs.collation
     - object
     - *Optional*. If the index uses :manual:`collation
       </reference/collation>` (available beginning with MongoDB 3.4), this
       specifies the language-specific rules to use when sorting and matching
       strings.

       If you specify the ``indexConfigs.collation`` object, you must specify
       the ``indexConfigs.collation.locale`` field. All other fields are optional.

       If you do not specify the ``indexConfigs.collation`` object, the index
       will not include collation.

   * - indexConfigs.collation.locale
     - string
     - The `ICU <http://site.icu-project.org/>`_ locale. For a list of
       supported locales, see :manual:`Collation Locales and Default Parameters
       </reference/collation-locales-defaults>` in the MongoDB manual. To
       specify simple binary comparison, specify a value of ``simple``.

   * - indexConfigs.collation.caseLevel
     - boolean
     - *Optional*. If set to ``true``, the index uses case comparison. This
       field applies only if the ``strength`` level is set to ``1`` or ``2``.
       See :manual:`Collation </reference/collation>` in the MongoDB manual
       for details.

   * - indexConfigs.collation.caseFirst
     - string
     - *Optional*. Determines the sort order of case differences during
       tertiary level comparisons. For possible values, see :manual:`Collation
       </reference/collation>` in the MongoDB manual.

   * - indexConfigs.collation.strength
     - number
     - *Optional*. The level of comparison to perform. Corresponds to `ICU
       Comparison Levels
       <http://userguide.icu-project.org/collation/concepts#TOC-Comparison-Levels>`_.
       For possible values, see :manual:`Collation </reference/collation>` in
       the MongoDB manual.

   * - indexConfigs.collation.numericOrdering
     - boolean
     - *Optional*. If set to ``true``, collation compares numeric strings as
       numbers; i.e. ``10`` is greater than ``2``. If ``false``, collation
       compares numeric strings as strings; i.e. ``10`` is less than ``2``.

       The default is ``false``. See :manual:`Collation
       </reference/collation>` in the MongoDB manual for more information.

   * - indexConfigs.collation.alternate
     - string
     - *Optional*. Determines whether collation should consider whitespace and
       punctuation as base characters during comparisons. For possible values,
       see :manual:`Collation </reference/collation>` in the MongoDB manual.

   * - indexConfigs.collation.maxVariable
     - string
     - *Optional*. Determines which characters are are considered ignorable.
       This field applies only if ``indexConfigs.collation.alternate`` is set
       to ``shifted``. For possible values, see :manual:`Collation
       </reference/collation>` in the MongoDB manual.

   * - indexConfigs.collation.normalization
     - boolean
     - *Optional*. If ``true``, collation checks if text requires `normalization
       <http://userguide.icu-project.org/collation/concepts#TOC-Normalization>`_
       and performs normalization to compare text.

       The default is ``false``. See :manual:`Collation
       </reference/collation>` in the MongoDB manual for more information.

   * - indexConfigs.collation.backwards
     - boolean
     - *Optional*. If ``true``, strings with diacritics sort from the back to
       the front of the string.

       The default is ``false``. See :manual:`Collation
       </reference/collation>` in the MongoDB manual for more information.

   * - indexConfigs.options
     - document
     - The index options. Currently supports only those options supported by
       the `mgo driver <http://godoc.org/labix.org/v2/mgo#Index>`_.
