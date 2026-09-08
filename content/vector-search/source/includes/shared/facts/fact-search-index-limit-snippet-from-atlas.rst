.. This file is snippet output generated from content/atlas/source/includes/search-shared/fact-search-index-limit.rst.
   Do not modify this file. Edit the source file instead.

A high index count generates significant load on the base cluster and might disrupt your
workload. The hard limit for search indexes on a single cluster is 2,500. However, the
number of indexes your cluster can support depends on your cluster tier and workload.
Smaller cluster tiers like ``M10`` might experience performance degradation or
out-of-memory errors with far fewer indexes. Start with a small number of indexes and
monitor your cluster's resource usage as you scale.

