.. _atlas-sp-20260709:

9 July 2026 Release
-------------------

- Improves how Kafka source stream processors distribute processing
  across partitions during periods of heavy load, resulting in more
  even processing.
- Adds stream processor CPU and memory usage to the
  :guilabel:`Monitoring` tab in the {+atlas-ui+}. To learn more, see
  :ref:`atlas-sp-monitoring-ui`.

.. _atlas-sp-20260630:

30 June 2026 Release
---------------------

- Adds general availability support for writing to {+iceberg+}
  tables using the ``$iceberg`` aggregation stage. To learn more,
  see :ref:`$iceberg <atlas-sp-agg-iceberg>`.

.. _atlas-sp-20260623:

23 June 2026 Release
--------------------

- Adds support for regional failover. To learn more, see
  :ref:`atlas-sp-architecture-failover`.

.. _atlas-sp-20260618:

18 June 2026 Release
--------------------

- Overhauls the UI experience for creating and editing a stream
  processor. To learn more, see
  :ref:`atlas-sp-manage-processor-create`.
- Adds read-only access to the :guilabel:`Edit Connection` page for
  in-use connections from a connection registry entry. A banner
  indicates that you must stop processors using the connection before
  making any changes. Previously, you had to stop processors using the
  connection to view its details. To learn more, see
  :ref:`atlas-sp-manage-connection-view`.
- Improves error messaging when creating a pipeline in the
  {+atlas-ui+}.

.. _atlas-sp-20260615:

15 June 2026 Release
---------------------

- Adds support for multi-collection ``initialSync``. To learn more,
  see :ref:`atlas-sp-agg-source-syntax-coll`.
- Adds an ``addedParallelism`` field to
  :method:`sp.processor.stats()` that reports the additional
  parallelism the stream processor has configured, equal to the
  :ref:`Max Parallelism <stream-processing-costs>` defined by its
  stream processor tier.

.. _atlas-sp-20260611:

11 June 2026 Release
--------------------

- Adds the ability to change the tier of a stream processor in
  {+mongosh+}. To learn more, see :method:`sp.processor.modify()`.

.. _atlas-sp-20260605:

5 June 2026 Release
-------------------

- Adds the ability to change the tier of a {+spw+} in the {+atlas-ui+}.
- Adds direct links to the :guilabel:`Visual Builder` and
  :guilabel:`JSON editor` on empty {+spw+} cards.
- Fixes a bug where connection names could contain special characters
  other than ``.``, ``-``, ``*``, and ``_``.
- Fixes a bug where the :oas-bump-atlas-op:`Get One Stream Processor
  <getgroupstreamprocessor>` endpoint returns an HTTP 400 rather than a
  404 when the stream processor doesn't exist.

.. _atlas-sp-20260525:

25 May 2026 Release
-------------------

- Integrates an improvement to ``initialSync`` memory handling.

.. _atlas-sp-20260507:

7 May 2026 Release
------------------

- Adds support for the ``brazilsouth`` and ``australiaeast`` in |azure|,
  ``eu-west-3`` in {+aws+}, and ``us-east4`` in {+gcp+} regions.
- Adds support for private networking for |azure| Blob Storage
  connections. To learn more, see :ref:`atlas-sp-pl-azure-blob-add`.
- Fixes an issue that returned an incorrect HTTP status code when
  a workspace is not found.
- Adds a display of the {+aws-pl+} cost for {+aws-kinesis+} and
  S3 connections in the {+atlas-ui+}.
- Fixes a UI issue where {+gcp-psc+} costs were not displaying
  correctly for {+gcp+} workspaces.
- Removes the source message consumption and sink message delivery
  panels in the stream processor metrics UI when the source or
  sink does not support per-target statistics.
- Fixes an invalid field in the Kinesis sink template in the
  Pipeline Visual Builder.
- Adds a ``tier`` option to the
  :oas-bump-atlas-op:`Create One Stream Processor
  <creategroupstreamprocessor>` endpoint in the
  {+atlas-admin-api+}.

.. _atlas-sp-20260428:

28 April 2026 Release
---------------------

- Integrates fixes for latency stats for ``$lookup`` when not using 
  parallelism.
- Adds the :oas-bump-atlas-op:`metricThreshold <creategroupalertconfig>`
  object and deprecates the legacy ``threshold`` object to fix Terraform
  resource creation issues without breaking backward compatibility.

.. _atlas-sp-20260415:

15 April 2026 Release
---------------------

- Adds support for {+gcp+} Pub/Sub as a sink. To learn more, see 
  :ref:`{+gcp+} Pub/Sub Connections <atlas-sp-add-connection>`.
- Adds support for uploading processor definitions directly from
  local ``.json`` files using a new :guilabel:`Upload file` button
  on the JSON Editor UI page.

.. _atlas-sp-20260406:

6 April 2026 Release
--------------------

- Adds support for |azure| Blob Storage as a sink. To learn more, see
  :ref:`Azure Blob Storage <sp-emit-azure-blob>` (``$emit`` stage) and
  :ref:`Azure Blob Storage Connections <atlas-sp-add-connection>`.

.. _atlas-sp-20260325:

25 March 2026 Release
---------------------

- Replaces the test icon with a labeled :guilabel:`TEST` button for Sample, 
  {+kafka+}, and {+service+} connections.
- Blocks deletion of clusters that stream processors still reference.
- Allows changing {+kafka+} connection authentication between ``PLAIN`` 
  and ``OIDC`` in the connection registry.
- Adds additional validation for {+kafka+} bootstrap server hostnames.

.. _atlas-sp-20260216: 

16 February 2026 Release
------------------------ 

- Enables project-level streams auditing by default and removes the
  :guilabel:`Streams Auditing` toggle from the :guilabel:`Database &
  Network Access > Security > Advanced` page in the {+atlas-ui+}. Audit
  logs are now always-on and non-deletable to meet security and
  compliance expectations. To learn more about {+atlas-sp+} auditing,
  see :ref:`atlas-sp-security`.
- Adds a real-time status (``Ready``, ``Pending``, ``Failed``,
  ``Deleting``) to the {+atlas-ui+} when you :ref:`view connections in
  the connection registry <atlas-sp-manage-connection-view>`.
- Adds support for {+aws-kinesis+} connections as source and sink
  options when you :ref:`Create a Stream Processor
  <atlas-sp-manage-processor-create>` in the {+atlas-ui+}.
- Adds support for the :oas-atlas-op:`Download Operational Logs for One
  Atlas Stream Processing Workspace
  <downloadGroupStreamOperationalLogs>` endpoint in the
  {+atlas-admin-api+} to download operational logs for {+atlas-sp+}
  workspaces or stream processors.  
- Fixes an issue that prematurely marked streams connections as
  ``Ready`` while the underlying {+service+} cluster was still
  provisioning.
- Fixes an issue where the ``modifyStreamProcessor`` action was
  unavailable for role assignment.
- Improves error handling for the operations to start, stop, and delete
  stream processors.
- Improves validation for Azure Event Hub connections to ensure only
  valid Namespace ARM URIs are accepted.

.. _atlas-sp-20260107: 

7 January 2026 Release
----------------------

- Adds support for `Avro serializarion <https://avro.apache.org/>`__.
- Adds support for integrations with `Confluent Schema Registry <https://docs.confluent.io/platform/current/schema-registry/index.html#sr-for-product>`__.
- Allows writing over an HTTPS connection using :ref:`$https <atlas-sp-agg-https>` as a final stage in a pipeline.
