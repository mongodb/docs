.. _atlas-sp-20251203: 

3 December 2025 Release
------------------------

- Adds support for |aws| Kinesis as a :ref:`source
  <atlas-sp-agg-source-syntax-kinesis>` (``$source`` stage) and as a
  :ref:`sink <sp-emit-kinesis>` (``$emit`` stage).
- Updates :ref:`data transfer pricing <atlas-sp-processor-billing>` to
  reflect region-specific rates for both the stream processor and
  destination region. To learn more, see :ref:`stream processor pricing
  <atlas-sp-processor-billing>`.
- Updates pricing for ``SP10`` and ``SP30`` tier stream processors from
  the :ref:`legacy worker-based model
  <atlas-sp-architecture-workers-legacy>` to the per-processor pricing
  model. To learn more, see :ref:`stream processor pricing
  <atlas-sp-processor-billing>`.

.. _atlas-sp-20250908:

8 September 2025 Release
------------------------

- Adds support to :ref:`create a stream processor pipeline
  <streams-manage-create>` in the {+atlas-ui+}. 

.. _atlas-sp-20251029:

29 October 2025 Release
------------------------

- Replaces the previous instance model with {+atlas-sp+} Workspaces. To learn 
  more, see :ref:`Stream Processing Tiers <atlas-sp-architecture-tiers>`.
- Adds new stream processor tiers: ``SP2``, ``SP5``, and ``SP50``.

.. _atlas-sp-20250901:

1 September 2025 Release
------------------------

- Adds support for the {+aws+} |s3| private link connection type.

.. _atlas-sp-20250827:

27 August 2025 Release
----------------------

- Adds the :guilabel:`Test Connection` button in the Connection Registry
  UI to initiate a connectivity test for each connection.
- Adds the ``tenant_name``, ``project_name``, and ``org_name`` fields
  to {+atlas-sp+} metrics, including those exported to Datadog.
- Adds ``lifetime cache hit/miss`` statistics to the 
  :ref:`stats.operatorStats <atlas-sp-manage-processor-stats>` of the
  :ref`atlas-sp-agg-cachedlookup` stage.

.. _atlas-sp-20250821:

21 August 2025 Release
----------------------

- Adds support for the ``Stream Processor State`` metric in
  the {+service+} :ref:`Datadog integration <datadog-integration>`.

.. _atlas-sp-20250819:

19 August 2025 Release
----------------------

- Adds the ``$function`` operator, allowing for Javascript execution 
  in stream processing pipelines. To learn more, see :ref:`atlas-sp-agg-function`.

- Adds the ``$cachedLookup`` operator allowing for
  ``$lookup`` results to be cached for a specific TTL to improve the performance 
  of slowly changing data. To learn more, see :ref:`atlas-sp-agg-cachedlookup`.

.. _atlas-sp-20250818:

18 August 2025 Release
----------------------

- Adds the ability for the ``$emit`` stage to send ``null`` values 
  to Kafka topics to support compacting Kafka Topics by using 
  ``$emit.config.tombstoneWhen = boolean``. To learn more, see 
  :ref:`streams-agg-pipeline-emit`.

.. _atlas-sp-20250806:

6 August 2025 Release
---------------------

- Adds support for Cross Atlas Project for ``$source`` and ``$merge``.
  To learn more, see `Atlas Connection <https://www.mongodb.com/docs/atlas/atlas-stream-processing/atlas-connection/>`__.

.. _atlas-sp-20250731:

31 July 2025 Release
--------------------

- Adds support for ``$source`` to support Initial Sync when reading from Atlas collections.
  To learn more, see `MongoDB Collection Change Stream <https://www.mongodb.com/docs/atlas/atlas-stream-processing/sp-agg-source/#mongodb-collection-change-stream>`__.

.. _atlas-sp-20250725:

25 July 2025 Release
--------------------

- Adds support for Stream Processing Workspaces to deploy on Google Cloud. 
  To learn more, see `Google Cloud (GCP) Stream Processing Regions <https://www.mongodb.com/docs/atlas/reference/google-gcp/#std-label-gcp-stream-processing-regions>`__.


.. _atlas-sp-20250627:

27 June 2025 Release
---------------------

- Adds support for ``$merge`` to be able to delete documents in collections. 
  To learn more, see `$merge (Stream Processing) <https://www.mongodb.com/docs/atlas/atlas-stream-processing/sp-agg-merge/#definition>`__.


.. _atlas-sp-20250616:

16 June 2025 Release
---------------------

- Adds support for Datadog Metrics. 
  To learn more, see `Datadog Metrics <https://www.mongodb.com/docs/atlas/atlas-stream-processing/monitoring/#stream-processor-metrics-in-datadog>`__.

.. _atlas-sp-20250602:

2 June 2025 Release
-------------------

- Adds support for {+aws+} |s3| connections.

.. _atlas-sp-20250430:

30 April 2025 Release
---------------------

- Adds a new :pipeline:`$sessionWindow` {+atlas-sp+} pipeline aggregation stage
  that specifies a session window for aggregation of data. This allow you
  to run a pipeline on each "session" of activity in an input stream.
  To learn more, see :ref:`$sessionWindow <atlas-sp-agg-session>`.
- Supports :ref:`Azure-hosted Confluent Kafka clusters via Private Link connection <atlas-sp-azure-confluent-private-link-add>`.

.. _atlas-sp-20250326:

26 March 2025 Release
---------------------

- Adds a new :pipeline:`$externalFunction` {+atlas-sp+} pipeline stage
  that triggers processes in a specific AWS Lambda resource. To learn more,
  see :ref:`$externalFunction <atlas-sp-agg-external-function>`.

.. _atlas-sp-20250312:

12 March 2025 Release
---------------------

- Supports :ref:`creating $https connections <atlas-sp-add-connection>`
  in the {+atlas-ui+}.
- Adds the ``parallelism`` field to :ref:`$merge <streams-agg-pipeline-merge>`.
  The field specifies the number of threads to which to distribute write
  operations, which improves performance.
- Allow you to create additional alerts: Output Message Count, DLQ Message Count,
  Kafka Lag, and Change Stream Delay. To learn more, see :ref:`atlas-sp-alerts`.

.. _atlas-sp-20250305:

5 March 2025 Release
--------------------

- Supports the :ref:`createUUID <atlas-sp-agg-createuuid>`
  expression that takes no arguments and returns UUID |bson| type values
  in Stream Processors.

- Adds a new configuration for Window operators to support ``processingTime``
  in addition to ``eventTime``. To learn more, see :ref:`atlas-sp-processing-time`.
- Adds the :ref:`$meta <atlas-sp-agg-meta>` expression that returns an
  object containing all streaming metadata for a document.
- Adds the ``parseJsonStrings`` field to the ``$https`` operator, allowing
  it to parse JSON Strings returned from an API call. To learn more,
  see :ref:`$https <atlas-sp-agg-https>`.

.. _atlas-sp-20250214:

14 February 2025 Release
------------------------

- Allows you to :ref:`add a Kafka Private Link Connection <atlas-sp-pl-kafka-add>`
  for {+aws-msk+} clusters.
- Allows you to deploy Stream Processing Workspaces on AWS ``us-east-2``.
  To learn more, see :ref:`atlas-sp-regions`.

.. _atlas-sp-20250120:

20 January 2025 Release
-----------------------

- Supports the :ref:`$currentDate <atlas-sp-agg-currentdate>` expression
  that returns the system time of your {+spw+} each time {+atlas-sp+} evaluates it.
- Supports reading JSON documents with embedded file signatures (magic bytes).
- Fixes an issue that prevented the configuration of hopping windows with
  ``hopSize`` greater than ``interval``.

.. _atlas-sp-20250114:

14 January 2025 Release
-----------------------

- Changes the ``executionTimeSecs`` stat to ``executionTimeMillis``. To
  view this stat, invoke the :method:`sp.processor.stats()` command.
- Changes the buffering duration for :ref:`streams-agg-pipeline-emit`
  to {+kafka+} sinks from 1000 milliseconds to five milliseconds.
