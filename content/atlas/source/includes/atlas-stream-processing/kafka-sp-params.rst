.. _atlas-sp-kafka-connection-config:

Parameters Configuration
~~~~~~~~~~~~~~~~~~~~~~~~

Each interface for creating a Kafka connection allows you to provide
configuration parameters for your Kafka cluster. These configurations
take the form of key-value pairs, and correspond to one of the
following:

- A subset of `Producer
  <https://kafka.apache.org/documentation/#producerconfigs>`__
  configurations
- A subset of `Consumer
  <https://kafka.apache.org/documentation/#consumerconfigs>`__
  configurations.

{+atlas-sp+} passes only these parameters to your Kafka cluster. If
you declare any parameters not explicitly allowed, {+atlas-sp+} ignores
them.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Interface
     - Configuration Mechanism

   * - {+atlas-cli+}
     - Provide configurations as a ``.json`` file specified with the
       ``--file`` flag.

   * - {+atlas-admin-api+}
     - Provide configurations as a ``.json`` object specified in the
       ``config`` field.

   * - {+atlas-ui+}
     - Provide configurations in the :guilabel:`Configuration File`
       field of the :guilabel:`Add Connection` page.

{+atlas-sp+} supports the following configurations:

.. tabs::

   .. tab:: Producer Parameters
      :tabid: kafka-producer-param

      - `acks <https://kafka.apache.org/documentation/#producerconfigs_acks>`__
      - `batch.size <https://kafka.apache.org/documentation/#producerconfigs_batch.size>`__
      - `client.dns.lookup <https://kafka.apache.org/documentation/#connectconfigs_client.dns.lookup>`__
      - `client.id <https://kafka.apache.org/documentation/#consumerconfigs_client.id>`__ 
      - `compression.type <https://kafka.apache.org/documentation/#producerconfigs_compression.type>`__
      - `connections.max.idle.ms <https://kafka.apache.org/documentation/#brokerconfigs_connections.max.idle.ms>`__
      - `delivery.timeout.ms <https://kafka.apache.org/documentation/#producerconfigs_delivery.timeout.ms>`__
      - `enable.idempotence <https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence>`__
      - `linger.ms <https://kafka.apache.org/documentation/#producerconfigs_linger.ms>`__
      - `max.in.flight.requests.per.connection <https://kafka.apache.org/documentation/#producerconfigs_max.in.flight.requests.per.connection>`__
      - `message.max.bytes <https://kafka.apache.org/documentation/#brokerconfigs_message.max.bytes>`__
      - `queue.buffering.max.messages <https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md>`__
      - `request.timeout.ms <https://kafka.apache.org/documentation/#producerconfigs_request.timeout.ms>`__
      - `retries <https://kafka.apache.org/documentation/#producerconfigs_retries>`__
      - `transactional.id <https://kafka.apache.org/documentation/#producerconfigs_transactional.id>`__

   .. tab:: Consumer Parameters
      :tabid: kafka-consumer-param

      - `allow.auto.create.topics <https://kafka.apache.org/documentation/#consumerconfigs_allow.auto.create.topics>`__
      - `auto.offset.reset <https://kafka.apache.org/documentation/#consumerconfigs_auto.offset.reset>`__
      - `client.dns.lookup <https://kafka.apache.org/documentation/#consumerconfigs_client.dns.lookup>`__
      - `client.id <https://kafka.apache.org/documentation/#consumerconfigs_client.id>`__      
      - `connections.max.idle.ms <https://kafka.apache.org/documentation/#consumerconfigs_connections.max.idle.ms>`__
      - `fetch.max.bytes <https://kafka.apache.org/documentation/#consumerconfigs_fetch.max.bytes>`__
      - `fetch.min.bytes <https://kafka.apache.org/documentation/#consumerconfigs_fetch.min.bytes>`__
      - `group.id <https://kafka.apache.org/documentation/#consumerconfigs_group.id>`__
      - `heartbeat.interval.ms <https://kafka.apache.org/documentation/#consumerconfigs_heartbeat.interval.ms>`__
      - `isolation.level <https://kafka.apache.org/documentation/#consumerconfigs_isolation.level>`__
      - `max.partition.fetch.bytes <https://kafka.apache.org/documentation/#consumerconfigs_max.partition.fetch.bytes>`__
      - `max.poll.interval.ms <https://kafka.apache.org/documentation/#consumerconfigs_max.poll.interval.ms>`__
      - `request.timeout.ms <https://kafka.apache.org/documentation/#consumerconfigs_request.timeout.ms>`__
      - `session.timeout.ms <https://kafka.apache.org/documentation/#consumerconfigs_session.timeout.ms>`__
