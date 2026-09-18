.. :snippet-start: fact-search-index-limit
.. :snippet-output: content/search/source/includes/shared/facts/fact-search-index-limit.rst, content/vector-search/source/includes/shared/facts/fact-search-index-limit.rst

A high index count generates significant load on the base cluster and
might disrupt your workload. The number of indexes your cluster can
support depends on your cluster tier and workload. Smaller cluster tiers
like ``M10`` can experience performance degradation or out-of-memory
errors as index count increases. Start with a small number of indexes
and monitor your cluster's resource usage as you scale.

.. :snippet-end:
