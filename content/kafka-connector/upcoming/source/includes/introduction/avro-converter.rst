.. include:: /includes/introduction/intro-converters.rst

Converters with Schemas
-----------------------

The {+avro-converter+} is a schema-based converter. When you use a schema-based
converter, you should define a schema in your source connector. 

To learn how to specify a schema, see the 
:ref:`<kafka-source-apply-schemas>` guide.

Avro Connector Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section provides templates for properties files to configure the Avro converter in a
connector pipeline. Click the following tabs to view properties files that work with the
Avro converter:

.. tabs::

    .. tab:: Source
       :tabid: source-avro
 
       The following properties file defines a source connector. This connector
       uses the default schema and an Avro converter to write to an {+kafka+} topic:

       .. literalinclude:: /includes/properties-files/converters/avro-source.properties
          :language: java
          :dedent:

       .. important:: Avro Converter with a MongoDB Data Source

          Avro converters are a great fit for data with a static structure but are not
          a good fit for dynamic or changing data. MongoDB's schema-flexible document
          model supports dynamic data, so ensure your MongoDB data source has a static
          structure before specifying an Avro converter.

    .. tab:: Sink
       :tabid: sink-avro

       The following properties file defines a sink connector. This connector
       uses an Avro converter to read from an {+kafka+} topic:

       .. literalinclude:: /includes/properties-files/converters/avro-sink.properties
          :language: java
          :dedent:

To use the preceding properties file, replace the placeholder text in angle
brackets with your information.
