.. include:: /includes/fundamentals/intro-logging.rst

Example - Set Up
~~~~~~~~~~~~~~~~

This example shows how to set up your logger. Click the
tab corresponding to the build tool that you would like to use in your project.

.. tip:: Dependency Versions

   The following versions are illustrative rather than a
   source of truth. Check the official documentation for SLF4J and
   your logging framework of choice for guaranteed up-to-date version
   information.

   * `SLF4J documentation <http://www.slf4j.org/>`__
   * `Log4j2 documentation <https://logging.apache.org/log4j/2.x/manual/>`__ 


.. tabs::

   .. tab:: Maven
      :tabid: maven

      Add the following dependency to your ``pom.xml`` file.

      .. include:: /includes/log4j2-maven-versioned.rst

   .. tab:: Gradle
      :tabid: gradle

      Add the following dependency to your ``build.gradle.kts`` file.

      .. include:: /includes/log4j2-gradle-versioned.rst

Once you have included the preceding dependency, log an error using the
following code:

.. literalinclude:: /examples/generated/LoggingTest.snippet.slf4j.kt
   :language: kotlin

.. io-code-block::

   .. input:: /examples/generated/LoggingTest.snippet.slf4j.kt
      :language: kotlin

   .. output::
      :language: console

      12:35:00.438 [main] ERROR <my package path> - Logging an Error

.. note:: Default Log Level

   The default log level of Log4J2 is ERROR. This means that running
   standard operations in the MongoDB Kotlin driver will not produce output
   from Log4J2 without configuration. To learn how to change your Log4J2
   logger's log level, see the example in the Configure Your Logger section of this page.

For more information on Log4j2, see the
`Log4j2 manual <https://logging.apache.org/log4j/2.x/manual/>`__.

.. include:: /includes/fundamentals/configure-logger.rst

Specify Log4j2 configurations in a file named ``log4j2.xml``. Your
``log4j2.xml`` file does not have to be in a specific location, but it must
be accessible from your classpath.

The Log4j2 framework defines the following log levels. The following lists the
log levels, ordered from most urgent to least urgent:

- FATAL
- ERROR
- WARN
- INFO
- DEBUG
- TRACE
- ALL

Set your ``log4j2.xml`` file to the following.

.. code-block:: xml

   <?xml version="1.0" encoding="UTF-8"?>
   <Configuration status="INFO">
      <Appenders>
         <Console name="Console" target="SYSTEM_OUT">
               <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
         </Console>
      </Appenders>
      <Loggers>
         <Root level="INFO">
               <AppenderRef ref="Console"/>
         </Root>
      </Loggers>
   </Configuration>

To test that your logger configuration was successful, run the following
code.

.. io-code-block::

   .. input:: /examples/generated/LoggingTest.snippet.trigger-logging.kt
      :language: kotlin

   .. output::
      :language: console

      ...
      10:14:57.633 [cluster-ClusterId{value=<your cluster id>, description='null'}-<your connection uri>] INFO  org.mongodb.driver.cluster - Discovered replica set primary <your connection uri>
      10:14:57.790 [main] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:7, serverValue:<your server value>}] to <your connection uri>

For more information on configuring Log4j2, see the official
`Log4j2 configuration guide
<https://logging.apache.org/log4j/2.x/manual/configuration.html>`__.

.. include:: /includes/fundamentals/logger-names.rst

Set your ``log4j2.xml`` file to the following:

.. code-block:: xml
   :emphasize-lines: 9

   <?xml version="1.0" encoding="UTF-8"?>
   <Configuration status="INFO">
      <Appenders>
         <Console name="Console" target="SYSTEM_OUT">
               <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
         </Console>
      </Appenders>
      <Loggers>
         <Logger name="org.mongodb.driver.connection" level="INFO"/>
         <Root level="OFF">
               <AppenderRef ref="Console"/>
         </Root>
      </Loggers>
   </Configuration>

To test that your logger configuration was successful, run the following
code.

.. io-code-block::

   .. input:: /examples/generated/LoggingTest.snippet.trigger-logging.kt
      :language: kotlin

   .. output::
      :language: console

      ...
      15:40:23.005 [cluster-ClusterId{value='<some value>', description='null'}-<your connection uri>] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:3, serverValue:<your server value>}] to <your connection uri>
      15:40:23.159 [main] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:7, serverValue:<your server value>}] to <your connection uri>

For more information on configuring Log4j2, see the
`official Log4J2 configuration guide <https://logging.apache.org/log4j/2.x/manual/configuration.html>`__.