.. _opsmgr-server-4.4.0:

|onprem| Server 4.4.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-07-08*

- Supports management, monitoring and backup of MongoDB 4.4
  deployments.

- Can deploy to Kubernetes using the
  :k8s:`MongoDB Enterprise Kubernetes Operator </>`.

- Improves summary and detailed views of MongoDB deployments.

- Improves management performance of large sharded clusters.

  .. example::

     Applies requested configuration changes across the cluster faster.

- Improves rendering performance of the Metrics page.

- Supports direct monitoring of the |onprem| application database.

- Supports fetching MongoDB binaries from a custom |http| server.

- Sets the Profiler to use MongoDB slow query logs as the default data
  source.

  If you had not enabled the :doc:`Profiler </tutorial/profile-database>`:
    You now see the :doc:`Profiler </tutorial/profile-database>`. |mms|
    sources the data points from your
    :ref:`slow query logs <pa-slow-queries>`. These
    :ref:`data points <configuration-profiling-slowOpThresholdMs>` have
    been logged since |onprem| 4.2 through the
    :ref:`Performance Advisor <pa-slow-queries>`.

  If you had enabled the :doc:`Profiler </tutorial/profile-database>`:
    You continue to see the Profiler. |mms| sources the data points
    from your :ref:`slow query logs <pa-slow-queries>`  rather than
    through the
    :doc:`MongoDB Profiler entries </tutorial/profile-database>`.
    (These entries continue to be ingested.) The MongoDB profiler
    entries contain more detailed information than the slow query
    logs. To revert to using the profiler entries, toggle the
    Project's feature flag :guilabel:`Profiler Nds` to ``OFF``.

- Introduces Schema Advisor for automatic identification of schema
  optimization opportunities.

- Supports |aws| |iam| roles in |s3| Snapshot Store configurations.
