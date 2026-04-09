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