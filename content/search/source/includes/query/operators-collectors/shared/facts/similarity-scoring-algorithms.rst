By default, the |operator-name| operator uses the ``bm25`` similarity
algorithm to score documents depending on their relevance to the query.

You can change which similarity algorithm is used by specifying a
different similarity algorithm in the ``similarity.type`` property for
the |field-type| fields in your |fts| index definition. To learn how to
configure a |fts| index for the |field-type| type, see
|field-type-link|.

To learn more about the supported similarity algorithms, see
:ref:`Score Details <fts-similarity-algorithms>`.