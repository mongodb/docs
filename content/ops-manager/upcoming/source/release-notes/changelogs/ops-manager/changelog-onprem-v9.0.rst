.. _opsmgr-server-9.0.0:

|onprem| Server 9.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2026-09-29*

Improvements
~~~~~~~~~~~~

- Updates the {+mdbagent+} to
  :ref:`109.0.0.9285-1 <mongodb-109.0.0.9285-1>`.
- Enables opt-in OpenTelemetry-compatible collection that exports
  {+mdbagent+} metrics to a customer-configured observability
  platform. Configure the collector endpoint through Automation
  Config. To learn more, see :ref:`otel-integration-mms`.
- Enables backup agents to upload snapshot blocks directly to
  |s3| using presigned URLs, bypassing the |onprem| server data
  path. To learn more, see :ref:`om-direct-s3-backup`.
- Extends |s3| Object Lock immutability to oplog slices, enabling
  immutability for the entire point-in-time recovery chain. To
  learn more, see :ref:`om-immutable-s3-snapshots`.
- Adds public APIs to trigger replica-set re-elections by
  stepping down the primary or promoting a specified secondary.
  To learn more, see :ref:`api-re-election-jobs`.
- Adds |onprem| and {+mdbagent+} platform support for RHEL 10,
  Debian 13, and SUSE Linux Enterprise Server 16. To learn more,
  see :ref:`ops-manager-os-compatibility`.
- Updates JDK to Java 25.0.3+9.0.LTS.
- BI Connector reaches end of life. The BI Connector binary is
  no longer available from the MongoDB Download Center. Existing
  BI Connectors remain available and manageable, but |onprem| no
  longer supports adding new ones. To learn more, see
  :ref:`manage-bi-connector`.
