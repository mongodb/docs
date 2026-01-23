.. include:: /includes/introduction/intro-converters.rst

Converters with Schemas
-----------------------

The {+json-schema-converter+} is a schema-based converter. When you use a schema-based
converter, you should define a schema in your source connector.

To learn how to specify a schema, see the 
:ref:`<kafka-source-apply-schemas>` guide.

JSON Embedded Registry Connector Configuration
----------------------------------------------

This section provides templates for properties files to configure your connector to embed
JSON Schemas in messages.  Click the following tabs to view properties files that work
with embedded JSON Schemas:

.. important:: Increased Message Size

   Embedding a JSON Schema in your message increases the size of your
   message. To decrease the size of your messages while using JSON
   Schema, use Schema Registry.

.. tabs::

   .. tab:: Source
      :tabid: source-json-schema

      The following properties file defines a source connector. This connector
      uses the default schema and a JSON Schema converter to write to an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/json-schema-source-mixed.properties
         :language: java
         :dedent:

   .. tab:: Sink
      :tabid: sink-json-schema

      The following properties file defines a sink connector. This connector
      uses a JSON Schema converter to read from an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/json-schema-sink-mixed.properties
         :language: java
         :dedent:

To use the preceding properties file, replace the placeholder text in angle
brackets with your information.