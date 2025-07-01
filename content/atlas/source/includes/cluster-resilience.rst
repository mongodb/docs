To improve the resiliency of your {+cluster+}, :ref:`upgrade your
cluster to MongoDB 8.0 <upgrade-major-MongoDB-version>`. MongoDB 8.0
introduces the following performance improvements and new features
related to resilience:

- :ref:`Improved memory management <resilient-upgraded-tcmalloc>`
- :ref:`Operation rejection filters <resilient-operations-rejection-filters>`  to reactively mitigate expensive queries
- :ref:`Cluster-level timeouts  <resilient-default-read-timeout>` for proactive protection against expensive read operations
- Better workload isolation with the :ref:`moveCollection command <resilient-move-collection>`