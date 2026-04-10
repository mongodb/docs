Create Your Own CDC Handler
---------------------------

If none of the prebuilt CDC handlers fit your use case, you can create your own.
Your custom CDC handler is a Java class that implements the ``CdcHandler`` interface.

To learn more, see the
:github:`source code for the CdcHandler interface <mongodb/mongo-kafka/blob/{+connector_version_github_tag+}/src/main/java/com/mongodb/kafka/connect/sink/cdc/CdcHandler.java>`.

To view examples of CDC handler implementations, see
:github:`the source code for the prebuilt CDC handlers <mongodb/mongo-kafka/tree/{+connector_version_github_tag+}/src/main/java/com/mongodb/kafka/connect/sink/cdc>`.

How to Use Your CDC Handler
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure your sink connector to use your custom CDC Handler, you must perform the
following actions:

#. Compile your custom CDC handler class to a JAR file.

#. Add the compiled JAR to the classpath/plugin path for your Kafka workers.
   For more information about plugin paths, see the `Confluent documentation
   <https://docs.confluent.io/current/connect/managing/community.html>`__.

   .. note::

      Kafka Connect loads plugins in isolation. When you deploy a custom write
      strategy, both the connector JAR and the CDC handler
      JAR should be on the same path. Your paths should resemble the following:

      | ``<plugin.path>/mongo-kafka-connect/mongo-kafka-connect-all.jar``
      | ``<plugin.path>/mongo-kafka-connect/custom-CDC-handler.jar``

      To learn more about {+kafka-connect+} plugins, see
      `this guide from Confluent <https://docs.confluent.io/home/connect/userguide.html#installing-kconnect-plugins>`__.

#. Specify your custom class in the ``change.data.capture.handler``
   :ref:`configuration setting <sink-configuration-change-data-capture>`.

To learn how to compile a class to a JAR file,
`see this guide from Oracle <https://docs.oracle.com/javase/tutorial/deployment/jar/build.html>`__.