The ``indexingMethod`` determines how {+avs+} indexes and
searches vectors. You can specify one of the following values:

- ``hnsw`` - Graph-based index structure (default)
- ``flat`` - Flat, non-graph index structure

.. _mdb-vs-hnsw-index-structure:

**HNSW Index Structure**
  
{+avs+} defaults to the :abbr:`HNSW (Hierarchical Navigable Small Worlds)` 
index structure, which suits the majority of workflows. This
graph-based index type performs |ann| search across large
datasets, trading accuracy for speed and scalability.

Use ``hnsw`` if:

- Your production systems require fast queries across massive
  datasets using |ann|.
- You have a large number of per-tenant or per-collection
  vectors.
- You want to tune recall or latency by using
  ``numCandidates``.
- Multiple users query large shared datasets.

You can also specify ``hnswOptions`` to override the default
values for the following :abbr:`HNSW (Hierarchical Navigable
Small Worlds)` settings:

- ``maxEdges``: Maximum number of edges, or connections,
  that a node can have in the :abbr:`HNSW (Hierarchical
  Navigable Small Worlds)` graph.
- ``numEdgeCandidates``: Maximum number of nodes that
  {+avs+} evaluates to find the closest neighbors to
  connect to a new node.

.. include:: /includes/avs/index/fact-hnsw-options-preview.rst

  To run an exhaustive search, or |enn| search, on an
  :abbr:`HNSW (Hierarchical Navigable Small Worlds)` index,
  set the ``exact`` parameter to ``true``.

.. _mdb-vs-flat-index-structure:

**Flat Index Structure**
  
This index type performs exhaustive search and ensures
100% recall (perfect accuracy), unlike the |ann| search
that :abbr:`HNSW (Hierarchical Navigable Small Worlds)`
provides. The flat index requires less CPU and memory
overhead because {+avs+} does not build or maintain a
graph. However, query speed decreases on larger datasets
because query time grows linearly with data growth.

Use ``flat`` if:

- Your queries use highly selective prefilters that match
  less than 5% of documents. For example, consider a
  multitenant workload with ``tenantId`` in the filter.
- Your applications require each user to search only
  their own data.
- You have small to medium datasets where high recall is
  mandatory.

This option is mutually exclusive with ``hnswOptions``.