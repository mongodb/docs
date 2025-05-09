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
  see :ref:`$externalFunction <streams-agg-pipeline-external-function>`.

.. _atlas-sp-20250323:

23 March 2025 Release
---------------------

- Supports using the :aws:`AWS Transit Gateway </vpc/latest/tgw/tgw-getting-started.html>`
  to connect to AWS Confluent Cloud clusters. To learn more,
  see :ref:`Add a Kafka Transit Gateway Connection <atlas-sp-kafka-transit-gateway>`.

.. _atlas-sp-20250312:

12 March 2025 Release
---------------------

- Supports :ref:`creating $https connections <atlas-sp-https-connection>`
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

- Allows you to :ref:`add a Kafka Private Link Connection <atlas-sp-kafka-connection-pl-add>`
  for {+aws-msk+} clusters.
- Allows you to deploy Stream Processing Instances on AWS ``us-east-2``.
  To learn more, see :ref:`atlas-sp-regions`.

.. _atlas-sp-20250120:

20 January 2025 Release
-----------------------

- Supports the :ref:`$currentDate <atlas-sp-agg-currentdate>` expression
  that returns the system time of your {+spi+} each time {+atlas-sp+} evaluates it.
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
