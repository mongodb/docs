.. step:: Configure the driver for your Maven application.

   Copy the dependency snippet from the
   `Maven Central Repository <https://central.sonatype.com/artifact/org.mongodb/mongodb-jdbc>`__.
   Edit the version number in the dependency snippet to match your JDBC driver version.

   For example:

   .. code-block:: xml

      <dependency>
         <groupId>org.mongodb</groupId>
         <artifactId>mongodb-jdbc</artifactId>
         <version>2.1.0</version>
      </dependency>
