.. include:: /includes/new-format-name.rst

Spark Shell
-----------

When starting the Spark shell, specify:

.. include:: /includes/extracts/command-line-start-spark-shell.rst

Import the MongoDB Connector Package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Enable MongoDB Connector-specific functions and implicits for your
``SparkSession`` and ``Dataset`` objects by importing the following 
package in the Spark shell:

.. code-block:: scala

   import com.mongodb.spark._

Connect to MongoDB
~~~~~~~~~~~~~~~~~~

Connection to MongoDB happens automatically when a Dataset
action requires a read from MongoDB or a
write to MongoDB.

.. _scala-app:

Self-Contained Scala Application
--------------------------------

Dependency Management
~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/scala-java-dependencies.rst

The following excerpt demonstrates how to include these dependencies in
a `SBT <http://www.scala-sbt.org/documentation.html>`_ ``build.scala`` file:

.. code-block:: scala

   scalaVersion := "2.12",
   libraryDependencies ++= Seq(
     "org.mongodb.spark" %% "{+artifact-id-2-12+}" % "{+current-version+}",
     "org.apache.spark" %% "spark-core" % "{+spark-core-version+}",
     "org.apache.spark" %% "spark-sql" % "{+spark-sql-version+}"
   )

Configuration
~~~~~~~~~~~~~

.. include:: /includes/scala-java-sparksession-config.rst

.. code-block:: scala

   package com.mongodb

   object GettingStarted {

     def main(args: Array[String]): Unit = {
     
       /* Create the SparkSession.
        * If config arguments are passed from the command line using --conf,
        * parse args for the values to set.
        */
       import org.apache.spark.sql.SparkSession
     
       val spark = SparkSession.builder()
         .master("local")
         .appName("MongoSparkConnectorIntro")
         .config("spark.mongodb.read.connection.uri", "mongodb://127.0.0.1/test.myCollection")
         .config("spark.mongodb.write.connection.uri", "mongodb://127.0.0.1/test.myCollection")
         .getOrCreate()
         
     }
   }

Troubleshooting
---------------

If you get a ``java.net.BindException: Can't assign requested address``,

- Check to ensure that you do not have another Spark shell already
  running.

- Try setting the ``SPARK_LOCAL_IP`` environment variable; e.g.

  .. code-block:: sh
  
     export SPARK_LOCAL_IP=127.0.0.1

- Try including the following option when starting the Spark shell:

  .. code-block:: sh

     --driver-java-options "-Djava.net.preferIPv4Stack=true"

If you have errors running the examples in this tutorial, you may need
to clear your local Ivy cache (``~/.ivy2/cache/org.mongodb.spark`` and
``~/.ivy2/jars``).
