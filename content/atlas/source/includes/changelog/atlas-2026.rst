.. _atlas_2026_04:

April 2026
----------

- Enables :ref:`cloud backup <backup-cloud-provider>` support for
  clusters deployed in the {+azure+} government environment.

- Enables configurable sampling for data model inference in
  {+Compass+} and Data Explorer. Specify the number of documents
  {+service+} samples when inferring a collection's schema.
  To learn more, see :ref:`atlas-ui-data-modeling`.

- Adds the uncompressed data size alongside compressed storage
  size for each collection in Data Explorer. Compare these sizes
  to identify collections with the most potential for space
  reclamation after compression. To learn more, see
  :ref:`atlas-ui-view-collections`.

- Adds CPU time to :ref:`Query Shape Insights <query-shape-insights>`,
  allowing you to identify and optimize resource-intensive
  operations and prioritize queries for cluster resource
  optimization.

- Improves :ref:`independent shard scaling <atlas-cluster-sharding>`
  by removing the two-tier zone gap limitation at the cluster
  level and adding support for asymmetric auto-scaling range
  configurations.

.. _atlas_2026_03:

March 2026
----------

- Introduces MongoDB Agent Skills, a package that injects
  MongoDB-specific engineering standards into AI agent development
  environments. The package provides six specialized capabilities
  covering schema design, query optimization, indexing, aggregation
  pipelines, data modeling, and {+service+} configuration. To
  learn more, see :ref:`ai-agents`.

- Adds support for high |cpu|, low |cpu|, and storage-optimized
  instance types for :ref:`Search nodes <what-is-search-node>` in
  additional {+aws+} regions, including ``AP_SOUTHEAST_5``,
  ``AP_SOUTHEAST_1``, ``EU_WEST_3``, ``EU_SOUTH_2``, ``AF_SOUTH_1``,
  ``AP_EAST_1``, ``AP_SOUTH_2``, ``AP_SOUTHEAST_3``,
  ``AP_SOUTHEAST_7``, ``EU_SOUTH_1``, ``EU_CENTRAL_2``,
  ``IL_CENTRAL_1``, ``MX_CENTRAL_1``, ``ME_CENTRAL_1``, and
  ``AP_SOUTHEAST_2``.  

- Improves :ref:`disk auto-scaling <cluster-autoscaling>` to trigger
  during long-running operations such as shard drain operations,
  preventing clusters from running out of disk space without
  requiring manual intervention.

- Adds support for sending all :ref:`Atlas logs
  <export-logs-external-sinks>`, including {+fts+} and {+atlas-sp+}
  logs, directly to Datadog, Splunk, {+gcp+} Cloud Storage, {+azure+}
  Blob Storage, and any OpenTelemetry-compatible vendor, making it
  easier to analyze MongoDB logs alongside other telemetry in your
  existing observability platform.

- Introduces a new alert that fires when a potentially dangerous
  :ref:`database profiler <profiler>` configuration is detected
  on your cluster, such as profiling all operations or profiling with a
  zero-millisecond threshold. This alert helps prevent unintended
  performance degradation on production workloads.

- Adds an automatic copy region option for
  :ref:`snapshot distribution <snapshot-distribution>`, allowing |service|
  to automatically copy backups to all regions in your cluster and keep
  copy destinations in sync as your cluster topology changes, reducing
  the risk of gaps in regional backup coverage.

- Removes the Search Query Analytics feature from |service|. Related
  developer content and documentation have been retired.

- Improves Intelligent Workload Management
  :ref:`write blocking <write-blocking-thresholds>`
  to use dynamic range-based thresholds instead of static values,
  reducing unnecessary write blocking during disk scaling operations.

- Enables backup support for {+Dedicated-cluster+}s deployed in
  {+azure+} that have data exfiltration prevention policies
  enabled, allowing you to take backups while enforcing
  preventative controls against data exfiltration.

.. _atlas_2026_02:

February 2026
-------------

- Improves performance of {+azure+} clusters larger than 512 GB.

- Adds support for :ref:`lexical prefilters <vectorSearch-agg-pipeline-filter>` in
  {+avs+}, enabling
  accelerated queries by reducing unnecessary computational load
  during query time.

- Standardizes {+atlas-admin-api+} :ref:`rate limiting <api-rate-limiting>`
  to use the {+token-bucket+}. Rate limits vary by endpoint set and scope
  (organization, project, user, or IP address). This approach provides
  predictable performance with burst capability and adds response headers
  that offer visibility into rate limit quotas, current usage, and reset times.

- Adds port mapping support for
  :ref:`Google Private Service Connect (PSC) <private-endpoint-concepts>`,
  enabling more flexible network configurations for clusters using
  GCP private endpoints.

- Introduces new granular :ref:`built-in roles <user-roles>` for
  improved security posture, allowing finer control over user
  permissions.

- Adds ``twoPhaseCommitCoordinator`` metrics to the
  :ref:`Datadog integration <third-party-integrations>`, providing
  visibility into two-phase commit operations.

- Adds support for secretless authentication when using {+azure+} Key
  Vault with :ref:`Encryption at Rest <security-kms-encryption>`.
  Instead of providing static credentials, you authorize an
  |service|-managed {+azure+} Service Principal that authenticates
  using short-lived OAuth 2.0 tokens. This eliminates the need to
  create, store, and rotate client secrets.

  This update also introduces support for unversioned Key Vault key URIs
  (``/keys/<key-name>``), which automatically resolve to the latest
  enabled key version.

  To learn more, see :ref:`security-azure-kms-secretless`.

- Improves cluster scaling operations by allowing disk upscaling to
  proceed even when unrelated capacity constraints exist, reducing
  unnecessary delays during cluster updates.

- Adds quality and usability improvements to the
  :ref:`Data Model Visualization <atlas-ui-data-modeling>` feature,
  making it easier to understand your data structures.

- Adds support for SSE-KMS encryption when :ref:`exporting
  Atlas logs to Amazon S3 <export-logs-external-sinks>`, allowing
  you to use your own AWS KMS keys for log encryption.

- Enables sending database and audit logs directly to Amazon S3 for
  long-term storage and compliance requirements.

- Adds reCAPTCHA Breached Password Detection to help prevent use of
  compromised passwords during account creation and password changes.

.. _atlas_2026_01:

January 2026
------------

- Adds visibility into alert severity levels with the ability to
  override default severity settings for individual alert types.

- Reduces network transfer costs for :ref:`MongoDB Search <atlas-search>`
  nodes by optimizing data replication between search node instances.

- Adds new alerting for clusters using
  :ref:`Encryption at Rest <security-kms-encryption>` when nodes cannot
  start due to KMS network access issues. This helps identify
  misconfigured KMS IP access lists that prevent cluster nodes from
  starting successfully.

- Improves automatic recovery for clusters using
  :ref:`Encryption at Rest <security-kms-encryption>`. Clusters can now
  automatically recover after a KMS key becomes available again, even
  when cluster processes are disabled.

- Updates index build completion notifications to clearly identify
  MongoDB Vector Search indexes and provide relevant documentation
  links for running your first vector search query.

- Adds the ability to view plan details, including trigger information,
  when reviewing cluster configurations.

- Introduces experimental solution modals in
  :ref:`Query Profiler <query-profiler>` that suggest indexing
  solutions for unindexed queries.

- Allows you to retain existing :ref:`cloud backups <cloud-backup-overview>`
  when disabling cloud backup on a cluster.

- General Availability: :ref:`MongoDB Assistant for Cluster Builder
  <atlas-ai-cluster-assistant>` helps you configure optimal cluster
  settings using natural language.

- Adds :ref:`cloud backup <cloud-backup-overview>` support for GCP clusters
  with data exfiltration prevention policies enabled.


.. last-run: 2026-04-15
