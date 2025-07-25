.. include:: /includes/new-format-name.rst

Dependency Management
---------------------

.. include:: /includes/scala-java-dependencies.rst

Beginning in version 3.2.0, Apache Spark supports both Scala 2.12 and 2.13.
Spark 3.1.3 and previous versions support only Scala 2.12.
To provide support for both Scala versions, version {+current-version+} of the Spark 
Connector produces two artifacts:

- ``org.mongodb.spark:{+artifact-id-2-12+}:{+current-version+}`` is 
  compiled against Scala 2.12, and supports Spark 3.1.x and above.  
- ``org.mongodb.spark:{+artifact-id-2-13+}:{+current-version+}`` is 
  compiled against Scala 2.13, and supports Spark 3.2.x and above.

.. important::
   
   Use the Spark Connector artifact that's compatible with your
   versions of Scala and Spark.  

The following excerpt from a Maven ``pom.xml`` file shows how to include dependencies 
compatible with Scala 2.12:

.. code-block:: xml
   
   <dependencies>
     <dependency>
       <groupId>org.mongodb.spark</groupId>
       <artifactId>{+artifact-id-2-12+}</artifactId>
       <version>{+current-version+}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.spark</groupId>
       <artifactId>spark-core_2.12</artifactId>
       <version>{+spark-core-version+}</version>
     </dependency>
     <dependency>
       <groupId>org.apache.spark</groupId>
       <artifactId>spark-sql_2.12</artifactId>
       <version>{+spark-sql-version+}</version>
     </dependency>
   </dependencies>

Configuration
-------------

.. include:: /includes/scala-java-sparksession-config.rst

.. code-block:: java

   package com.mongodb.spark_examples;

   import org.apache.spark.sql.SparkSession;
   
   public final class GettingStarted {
   
     public static void main(final String[] args) throws InterruptedException {
       /* Create the SparkSession.
        * If config arguments are passed from the command line using --conf,
        * parse args for the values to set.
        */
       SparkSession spark = SparkSession.builder()
         .master("local")
         .appName("MongoSparkConnectorIntro")
         .config("spark.mongodb.read.connection.uri", "mongodb://127.0.0.1/test.myCollection")
         .config("spark.mongodb.write.connection.uri", "mongodb://127.0.0.1/test.myCollection")
         .getOrCreate();
       
       // Application logic
         
     }
   }
   
- The ``spark.mongodb.read.connection.uri`` specifies the
  MongoDB server  address(``127.0.0.1``), the database to connect
  (``test``), and the collection (``myCollection``) from which to read
  data, and the read preference.

- The ``spark.mongodb.write.connection.uri`` specifies the
  MongoDB server address(``127.0.0.1``), the database to connect
  (``test``), and the collection (``myCollection``) to which to write
  data.

You can use a ``SparkSession`` object to write data to MongoDB, read
data from MongoDB, create Datasets, and perform SQL operations.
