.. include:: /includes/logging-monitoring/intro-logging.rst

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
   * `Logback documentation <https://logback.qos.ch/>`__

.. tabs::

   .. tab:: Maven
      :tabid: maven

      Add the following dependency to your ``pom.xml`` file:

      .. include:: /includes/logback-maven-versioned.rst


   .. tab:: Gradle
      :tabid: gradle

      Add the following dependency to your ``build.gradle`` file:

      .. include:: /includes/logback-gradle-versioned.rst

Once you have included the preceding dependency, connect to your
MongoDB instance and use the following code to retrieve a document:

.. include:: /includes/fundamentals/logging.rst

You should see output that resembles the following:

.. code-block:: none
   :copyable: false

   ...
   12:14:55.853 [main] DEBUG org.mongodb.driver.connection - Opened connection [connectionId{localValue:3, serverValue:3}] to <MongoDB hostname>
   12:14:55.861 [main] DEBUG org.mongodb.driver.protocol.command - Command "find" started on database <database> using a connection with driver-generated ID 3 and server-generated ID 3 to <MongoDB hostname>. The request ID is 5. Command: {"find": "<collection>", "filter": {}, "limit": 1, "singleBatch": true, "$db": "<database>", "lsid": {"id": {"$binary": {"base64": "<_id>", "subType": "04"}}}, "$readPreference": {"mode": "primaryPreferred"}}
   12:14:55.864 [main] DEBUG org.mongodb.driver.protocol.command - Command "find" succeeded in 4.34 ms using a connection with driver-generated ID 3 and server-generated ID 3 to <MongoDB hostname. The request ID is 5. Command reply: {"cursor": {"id": 0, "ns": "<database>.<collection>", "firstBatch": []}, "ok": 1.0, "$clusterTime": {"clusterTime": {"$timestamp": {"t": 1673778535, "i": 1}}, "signature": {"hash": {"$binary": {"base64": "<_id>", "subType": "00"}}, "keyId": 0}}, "operationTime": {"$timestamp": {"t": 1673778535, "i": 1}}}

.. note:: Default Log Level

   The default log level of Logback is DEBUG. To learn how to change your
   Logback logger's log level, see the example in the Configure Your Logger section of this page.

For more information about Logback, see the
`Logback manual <https://logback.qos.ch/manual/>`__.

Configure Your Logger
---------------------

To configure your logger, you must use the configuration system of the logging
framework bound to SLF4J.

The following example shows how you can use your logging framework's
configuration system to set your logger's **log level**.

A logger's log level specifies a lower bound for how urgent a message must be
for the logger to output that message.

Example - Configure
~~~~~~~~~~~~~~~~~~~

This example shows how to configure your logger's log level to INFO.

Specify Logback configurations in a file named ``logback.xml``.
You don't need to create your ``logback.xml`` file in a specific
location, but you must be able to access it from your classpath.

The Logback framework defines the following log levels. The
following lists the log levels, ordered from most urgent to least
urgent:

- ERROR
- WARN
- INFO
- DEBUG
- TRACE

Insert the following code into your ``logback.xml`` file:

.. code-block:: xml

   <configuration>
      <appender name="CONSOLE"
                class="ch.qos.logback.core.ConsoleAppender">
         <encoder>
            <pattern>
                  %-4relative [%thread] %-5level %logger{30} - %msg%n
            </pattern>
         </encoder>
      </appender>
      <root level="INFO">
         <appender-ref ref="CONSOLE" />
      </root>
   </configuration>

To test that your logger configuration was successful, run the following
code:

.. include:: /includes/fundamentals/logging.rst

You should see output that resembles the following:

.. code-block:: none
   :copyable: false

   ...
   1317 [cluster-ClusterId{value='<your cluster id>', description='null'}-<your connection uri>] INFO  org.mongodb.driver.cluster - Discovered replica set primary <your connection uri>
   1568 [main] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:7, serverValue:<server value>}] to <your connection uri>

For more information about configuring Logback, see the
`Logback Manual <https://logback.qos.ch/manual/configuration.html>`__.

.. include:: /includes/logging-monitoring/logger-names.rst

Insert the following code into your ``logback.xml`` file:

.. code-block:: xml
   :emphasize-lines: 10

   <configuration>
      <appender name="CONSOLE"
                class="ch.qos.logback.core.ConsoleAppender">
         <encoder>
            <pattern>
                  %-4relative [%thread] %-5level %logger{30} - %msg%n
            </pattern>
         </encoder>
      </appender>
      <logger name="org.mongodb.driver.connection" level="INFO" additivity="true"/>
      <root level="OFF">
         <appender-ref ref="CONSOLE" />
      </root>
   </configuration>

To test that your logger configuration was successful, run the following
code:

.. include:: /includes/fundamentals/logging.rst

You should see output that resembles the following:

.. code-block:: none
   :copyable: false

   ...
   829  [cluster-rtt-ClusterId{value='<some value>', description='null'}-<your connection URI>] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:2, serverValue:<your server value>}] to <your connection uri>
   977  [main] INFO  org.mongodb.driver.connection - Opened connection [connectionId{localValue:7, serverValue:<your server value>}] to <your connection uri>

For more information about configuring Logback, see the
`official Logback configuration guide
<https://logback.qos.ch/manual/configuration.html#syntax>`__.

.. include:: /includes/logging-monitoring/connection-settings.rst