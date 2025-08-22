Overview
--------

This guide describes how to use **converters** with the {+connector+}.
Converters are programs that translate between bytes and
{+kafka-connect+}'s runtime data format.

Converters pass data between {+kafka-connect+} and Apache Kafka. The connector passes data
between MongoDB and {+kafka-connect+}. The following diagram shows these relationships:

.. figure:: /includes/figures/converters.png
   :alt: Diagram illustrating converters' role in Kafka Connect  

To learn more about converters, see the following resources:

- `Article from Confluent <https://www.confluent.io/blog/kafka-connect-deep-dive-converters-serialization-explained/#configuring-converters>`__.
- `Confluent Article on Kafka Connect Concepts <https://docs.confluent.io/platform/current/connect/concepts.html#converters>`__
- `Converter Interface API Documentation <{+kafka_api_docs_base+}javadoc/org/apache/kafka/connect/storage/Converter.html>`__

Available Converters
--------------------

As the connector converts your MongoDB data into {+kafka-connect+}'s runtime data
format, the connector works with all available converters.

.. important:: Use the Same Converter for your Source and Sink Connectors

   You must use the same converter in your {+source-connector+} and {+sink-connector+}.
   For example, if your source connector writes to a topic using Protobuf, your
   sink connector must use Protobuf to read from the topic.

To learn what converter to use, `see this page from Confluent <https://docs.confluent.io/platform/current/schema-registry/connect.html>`__.