You cannot combine the |geo-operation| operator, which requires a
special :ref:`geospatial index <index-feature-geospatial>`, with a
query operator or command that requires another special index. For
example you cannot combine |geo-operation| with the :query:`$text`
query.
