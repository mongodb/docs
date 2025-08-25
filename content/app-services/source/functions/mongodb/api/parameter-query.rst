A :manual:`query filter </tutorial/query-documents/>` that specifies
which documents to find. Specify an empty query (``{}``) or omit this
parameter to match all documents in the collection.

You can use most :manual:`query selectors
</reference/operator/query/#query-selectors>` except for
:manual:`evaluation </reference/operator/query/#evaluation>`,
:manual:`geospatial </reference/operator/query/#geospatial>`, or
:manual:`bitwise </reference/operator/query/#bitwise>` selectors. You may 
only use these selectors in :ref:`system functions <system-functions>`.
