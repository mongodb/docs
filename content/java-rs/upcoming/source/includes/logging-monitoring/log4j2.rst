Example - Set Up
~~~~~~~~~~~~~~~~

This example shows how to set up your Log4j logger.

.. tip:: Dependency Versions

   The following versions are illustrative rather than a source of
   truth. Check the official documentation for SLF4J and your logging
   framework of choice for guaranteed up-to-date version information.

   * `SLF4J documentation <http://www.slf4j.org/>`__
   * `Log4j2 documentation <https://logging.apache.org/log4j/2.x/manual/>`__

Select the Maven or Gradle instructions based on your build tool:

**Maven**

Add the following dependency to your ``pom.xml`` file:

.. include:: /includes/log4j2-maven-versioned.rst

**Gradle**

Add the following dependency to your ``build.gradle`` file:

.. include:: /includes/log4j2-gradle-versioned.rst

Once you have included the preceding dependency, use the following
code to log an error:

.. code-block:: java

   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;

   ...

   Logger logger = LoggerFactory.getLogger("MyApp");
   logger.error("Logging an Error");

You should see output that resembles the following:

.. code-block:: none
   :copyable: false

   12:35:00.438 [main] ERROR <my package path> - Logging an Error

.. note:: Default Log Level

   The default log level of Log4j2 is ERROR. Running standard
   operations in the {+driver-short+} will not produce output from
   Log4j2 without configuration. To learn how to change your Log4j2
   logger's log level, see the example in the :ref:`java-rs-logging-configure-log-level-log4j2`
   section of this page.

For more information about Log4j2, see the
`Log4j2 manual <https://logging.apache.org/log4j/2.x/manual/>`__.

.. _java-rs-logging-configure-log-level-log4j2:

Configure Your Logger
---------------------

To configure your logger, you must use the configuration system of the
logging framework bound to SLF4J.

The following example shows how you can use your logging framework's
configuration system to set your logger's **log level**.

A logger's log level specifies a lower bound for how urgent a message
must be for the logger to output that message.

.. include:: /includes/logging-monitoring/logger-names.rst

Insert the following code into your ``log4j2.xml`` file:

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

To test that your logger configuration was successful, run the
following code:

.. include:: /includes/fundamentals/logging.rst

You should see output that resembles the following:

.. code-block:: none
   :copyable: false

   ...
   15:40:23.005 [cluster-ClusterId{value='<some value>', description='null'}-<your connection uri>] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:3, serverValue:<your server value>}] to <your connection uri>
   15:40:23.159 [main] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:7, serverValue:<your server value>}] to <your connection uri>

Additional Information
~~~~~~~~~~~~~~~~~~~~~~

For more information about configuring Log4j2, see the `official
Log4j2 configuration guide
<https://logging.apache.org/log4j/2.x/manual/configuration.html>`__.
