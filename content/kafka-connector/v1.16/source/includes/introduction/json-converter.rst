.. include:: /includes/introduction/intro-converters.rst

JSON Connector Configuration
----------------------------

This section provides templates for properties files to configure the JSON converter in a
connector pipeline. Click the following tabs to view properties files that work with the
JSON converter:

.. tabs::

   .. tab:: Source
      :tabid: source-json

      The following properties file defines a source connector. This connector
      uses a JSON converter to write to an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/json-source.properties
         :language: java
         :dedent:

   .. tab:: Sink
      :tabid: sink-json

      The following properties file defines a sink connector. This connector
      uses a JSON converter to read from an {+kafka+} topic: 

      .. literalinclude:: /includes/properties-files/converters/json-sink.properties
         :language: java
         :dedent:

To use the preceding properties file, replace the placeholder text in angle
brackets with your information.