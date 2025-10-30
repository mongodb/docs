.. _atlas-sp-20241210:

10 December 2024 Release
------------------------

- Supports |vpc| Peering with Confluent on |aws|.

.. _atlas-sp-20241202:

02 December 2024 Release
------------------------

- Supports using the {+atlas-admin-api+} to edit stream processors.
- Supports {+aws-pl+} with Confluent.
- Supports {+az-pl+} with EventHubs.

.. _atlas-sp-20241111:

11 November 2024 Release
------------------------

- Increases {+kafka+} Timeout from 10 seconds to 30 seconds.

.. _atlas-sp-20241023:

23 October 2024 Release
-----------------------

- Always retries processors when the target cluster is in the 
  ``REPAIRING`` state.
- Fixes the ``partitionIdleTimeout`` after the checkpoint restore.
- Adds more watermark and window information to verbose stats.
- Ensures calls to produce messages to {+kafka+} don't hang 
  indefinitely, even when the producer queue is full.

.. _atlas-sp-20241011:

11 October 2024 Release
-----------------------

- Supports ingesting multitopic {+kafka+} sources.
- Updates {+kafka+} ``offsets`` for consumer groups to near-real time.
- Supports the ``compression.type`` and ``acks`` settings in the
  {+kafka+} :ref:`$emit <streams-agg-pipeline-emit>` configuration.
- Supports collectionless :ref:`$lookup <streams-agg-pipeline-lookup>`
  syntax.
- Standardizes the way {+atlas-sp+} serializes {+kafka+} errors into a
  string.
- Increases the :ref:`$emit <streams-agg-pipeline-emit>` and
  :ref:`$merge <streams-agg-pipeline-merge>` dynamic expression limit to
  ``1000``.
- Handles :ref:`$lookup <streams-agg-pipeline-lookup>` with unique
  ``connectionName`` inside window pipeline.
- Improves paused cluster errors.

.. _atlas-sp-20240828:

28 August 2024 Release
----------------------

- Supports converting from :bsontype:`Binary` data to various data types using :manual:`$convert </reference/operator/aggregation/convert>`. This allows you to transform Kafka headers into specific data types as needed.
- Stream processors that use {+kafka+} as a source expose per-partition watermarks in :method:`sp.processor.stats()`.
- Fixes a bug where users were unable to create {+spw+}s in certain regions through the :oas-bump-atlas-op:`API <creategroupstreamworkspace>`.
