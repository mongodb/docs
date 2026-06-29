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
  in {+avs+} via the ``flat`` value for the ``indexingMethod`` option.
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
