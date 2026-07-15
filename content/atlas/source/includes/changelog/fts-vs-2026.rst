.. _fts20260706: 

06 July 2026 Release
~~~~~~~~~~~~~~~~~~~~

- Supports :ref:`sorted index <index-sort-ref>` to pre-sort documents 
  in ascending or descending order at index-time instead of sorting at 
  query-time. 

.. _fts20260630: 

30 June 2026 Release
~~~~~~~~~~~~~~~~~~~~

- Adds Native Reranking through the :pipeline:`$rerank` aggregation 
  stage for reordering input documents by using |voyage|'s 
  :ref:`reranking models <voyage-rerankers>`.

.. _fts20260624: 

24 June 2026 Release
~~~~~~~~~~~~~~~~~~~~

- Increases the maximum number of buckets to 10000 for :ref:`number 
  <fts-numeric-facet>` and :ref:`date <fts-date-facet>` facets.

.. _fts20260525: 

25 May 2026 Release
~~~~~~~~~~~~~~~~~~~

- Increases the maximum number of buckets to 10000 for :ref:`string 
  <fts-string-facet>` facets.

.. _avs20260430: 

30 April 2026 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds preview support for :pipeline:`$vectorSearch` over arrays of
  embeddings and arrays of embedded documents containing vectors.

.. _avs20260427: 

27 April 2026 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces the :ref:`storedSource <avs-stored-source-definition>`
  option for {+avs+} indexes to store source document fields with the
  index and return them in :pipeline:`$vectorSearch` results using
  ``returnStoredSource``.

.. _fts20260414: 

14 April 2026 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds support for :ref:`multi-select faceting <fts-facet-multi-select>`
  to enable users to filter by multiple buckets within the same
  :ref:`facet <fts-facet-ref>` without recomputing counts for the other
  buckets in that facet.

.. _avs20260407: 

07 April 2026 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds preview support for :ref:`flat indexes <avs-vector-index-method>`
  in {+avs+} through the ``flat`` value for the ``indexingMethod`` option.
  Flat indexes provide enhanced support for multitenant workloads,
  delivering improved performance, recall, and resource efficiency.

.. _fts20260129:

29 January 2026 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds new |fts| alerts and metrics for index field limits to
  prevent performance degradation and ``mongot`` instability, which
  over-indexing can cause:

  - :alert:`Atlas Search: Max Number of Fields Indexed is`

  - :alert:`Atlas Search: Max Number of nGram Fields Indexed is`

  To mitigate alerts, consider switching to static mapping, applying
  the attribute pattern for polymorphic schemas, and auditing ``nGram``
  or ``autocomplete`` usage. To learn more, see
  :ref:`review-atlas-search-metrics`.
