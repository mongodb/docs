.. include:: /includes/introduction/intro-converters.rst

Converters with Schemas
-----------------------

The {+protobuf-converter+} is a schema-based converter. When you use a schema-based
converter, you should define a schema in your source connector. 

To learn how to specify a schema, see the 
:ref:`<kafka-source-apply-schemas>` guide.

Protobuf Connector Configuration
--------------------------------

This section provides templates for properties files to configure the Protobuf converter in a
connector pipeline. Click the following tabs to view properties files that work with the
Protobuf converter:

.. tabs::

   .. tab:: Source
      :tabid: source-proto

      The following properties file defines a source connector. This connector
      uses the default schema and a Protobuf converter to write to an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/protobuf-source.properties
         :language: java
         :dedent:

   .. tab:: Sink
      :tabid: sink-proto

      The following properties file defines a sink connector. This connector
      uses a Protobuf converter to read from an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/protobuf-sink.properties
         :language: java
         :dedent:

To use the preceding properties file, replace the placeholder text in angle
brackets with your information.