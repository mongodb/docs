.. include:: /includes/introduction/intro-converters.rst

String Connector Configuration
------------------------------

This section provides templates for properties files to configure the String converter in a
connector pipeline. Click the following tabs to view properties files that work with the
String converter:

.. tabs::

   .. tab:: Source
      :tabid: source-string

      The following properties file defines a source connector. This connector
      uses a String converter to write to an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/string-source.properties
         :language: java
         :dedent:

   .. tab:: Sink
      :tabid: sink-string

      The following properties file defines a sink connector. This connector
      uses a String converter to read from an {+kafka+} topic:

      .. literalinclude:: /includes/properties-files/converters/string-sink.properties
         :language: java
         :dedent:

      .. important:: Received Strings Must be Valid JSON

         Your sink connector must receive valid JSON strings from your
         {+kafka+} topic even when using a String converter.

To use the preceding properties file, replace the placeholder text in angle
brackets with your information.