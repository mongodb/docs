If you deployed :ref:`dedicated Search nodes <node-architecture>` and
you are sorting results by ``searchScore``, consider the following: 

- By default, |fts| scores documents using the ``bm25`` similarity
  algorithm, which calculates term frequency in relation to the entire
  corpus of documents on the |fts| node. Because each |fts| node
  replicates from the changestream independently, this corpus might vary
  across |fts| nodes. As a result, the same query can return different
  ``bm25`` scores when routed to different |fts| nodes. Subsequent
  queries are more likely to be routed to different |fts| nodes if your
  deployment uses :ref:`dedicated {+fts+} nodes <node-architecture>`, or
  your :manual:`read preference </reference/read-preference/>` is
  set to ``secondary`` or ``nearest``.
- To ensure consistent scores across subsequent queries, set the
  ``similarity.type`` property to ``stableTfl`` or ``boolean`` when you
  index a field as the |fts| :ref:`string <bson-data-types-string>` or
  :ref:`autocomplete <bson-data-types-autocomplete>` type. This forces
  the :ref:`text <text-ref>`, :ref:`phrase <phrase-ref>`,
  :ref:`queryString <querystring-ref>`, and :ref:`autocomplete
  <autocomplete-ref>` operators to use the ``stableTfl`` or ``boolean``
  similarity algorithm to calculate relevance scores for queries on the
  indexed field. These algorithms calculate scores consistently across
  all |fts| nodes. To learn more, see :ref:`Score Details
  <fts-similarity-algorithms>`.