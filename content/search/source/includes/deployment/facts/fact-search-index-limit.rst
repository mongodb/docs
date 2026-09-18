.. SHARED FILE: This file is a copy of
   content/atlas/source/includes/deployment/facts/fact-search-index-limit.rst
   Any changes here must also be applied to the source file.

A high index count generates significant load on the base cluster and
might disrupt your workload. The number of indexes your cluster can
support depends on your cluster tier and workload. Smaller cluster tiers
like ``M10`` can experience performance degradation or out-of-memory
errors as index count increases. Start with a small number of indexes
and monitor your cluster's resource usage as you scale.
