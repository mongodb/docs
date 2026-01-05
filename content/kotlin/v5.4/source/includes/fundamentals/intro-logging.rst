Overview
--------

In this guide, you can learn how to set up and configure a logger in the
MongoDB {+driver-short+}.

You will learn how to:

- Set up a logger using the Simple Logging Facade For Java (SLF4J)
- Configure the log level of your logger

This guide shows how to record events in the driver.
If you would like to learn how to use information about the activity of the
driver in code, consider reading our
:ref:`guide on monitoring <kotlin-monitoring>`.

Set Up a Logger
---------------

This section gives background on the dependencies necessary to set up a
logger and provides an example logger setup.

Background
~~~~~~~~~~

The MongoDB {+driver-short+} uses the Simple Logging Facade For Java (SLF4J).
SLF4J allows you to specify your logging framework of choice at deployment time.
For more information on SLF4J,
`see the SLF4J documentation <http://www.slf4j.org/>`__.

Setting up a logger is optional. When you start your application the MongoDB
Kotlin driver looks for the ``slf4j-api`` artifact in your classpath. If the driver
can't find the ``slf4j-api`` artifact, the driver logs the following warning with
``java.util.logging`` and disables all further logging:

.. code-block:: none
   :copyable: false

   WARNING: SLF4J not found on the classpath.  Logging is disabled for the 'org.mongodb.driver' component

To set up a logger, you must include the following in your project.

* The ``slf4j-api`` artifact
* A logging framework
* A **binding**

.. note::

    For the most popular logging frameworks, there is often a single binding
    artifact that lists the ``slf4j-api`` and the logging framework as
    dependencies. This means that you can set up a logger by adding one artifact
    to your project's dependency list. You will see this in the example below.

A binding is a piece of code that connects the ``slf4j-api`` artifact with a
logging framework. The following example shows how to bind the ``slf4j-api`` artifact
to your chosen logging framework.