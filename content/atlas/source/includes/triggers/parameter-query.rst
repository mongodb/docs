A :manual:`query filter </tutorial/query-documents/>` that specifies
which documents to find. Specify an empty query (``{}``) or omit this
parameter to match all documents in the collection.

You can use most :manual:`query selectors
</reference/mql/query-predicates/#query-selectors>` except for
:manual:`miscellaneous </reference/mql/query-predicates/misc/#query-selectors-misc>`,
:manual:`geospatial </reference/mql/query-predicates/geospatial/#query-selectors-geospatial>`, or
:manual:`bitwise </reference/mql/query-predicates/bitwise/#query-selectors-bitwise>` selectors. You may
only use these selectors in :ref:`system functions <atlas-system-functions>`.
