.. include:: /includes/introduction/intro-converters.rst

Converters with Schemas
-----------------------

The {+json-schema-converter+} is a schema-based converter. When you use a schema-based
converter, you should define a schema in your source connector.

To learn how to specify a schema, see the 
:ref:`<kafka-source-apply-schemas>` guide.

JSON Schema Registry Connector Configuration
--------------------------------------------

This section provides templates for properties files to configure the JSON Schema registry converter in a
connector pipeline. Click the following tabs to view properties files that configure your connector to manage JSON Schemas
using Confluent Schema Registry:

.. tabs::

   .. tab:: Source
      :tabid: source-json-schema

      The following properties file defines a source connector. This connector
      uses the default schema and a JSON Schema converter to write to an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/json-schema-source.properties
         :language: java
         :dedent:

   .. tab:: Sink
      :tabid: sink-json-schema

      The following properties file defines a sink connector. This connector
      uses a JSON Schema converter to read from an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/json-schema-sink.properties
         :language: java
         :dedent:

To use the preceding properties file, replace the placeholder text in angle
brackets with your information.