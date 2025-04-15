a. Add the Java driver version 4.11 or higher as a dependency in your Java project.
   Select one of the following tabs, depending on your package manager:

   .. tabs::

      .. tab:: Maven
         :tabid: maven

         If you are using Maven, add the following dependencies to the
         ``dependencies`` array in your project's ``pom.xml`` file:

         .. code-block:: xml
            :caption: pom.xml

            <dependencies>
               <!-- MongoDB Java Sync Driver v4.11.0 or later -->
               <dependency>
                  <groupId>org.mongodb</groupId>
                  <artifactId>mongodb-driver-sync</artifactId>
                  <version>[4.11.0,)</version>
               </dependency>
            </dependencies>

      .. tab:: Gradle
         :tabid: gradle

         If you are using Gradle, add the following to the ``dependencies``
         array in your project's ``build.gradle`` file:

         .. code-block:: json
            :caption: build.gradle

            dependencies {
               // MongoDB Java Sync Driver v4.11.0 or later
               implementation 'org.mongodb:mongodb-driver-sync:[4.11.0,)'
            }

#. Run your package manager to install the dependencies to your project.

   For more detailed installation instructions and version compatibility, see
   the :driver:`MongoDB Java Driver documentation
   </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

#. Define the index.

   Paste the following example into a file named ``CreateIndex.java``.

   .. code-block:: java
      :caption: CreateIndex.java
      :emphasize-lines: 10
      :linenos:

      import com.mongodb.client.MongoClient;
      import com.mongodb.client.MongoClients;
      import com.mongodb.client.MongoCollection;
      import com.mongodb.client.MongoDatabase;
      import org.bson.Document;

      public class CreateIndex {
          public static void main(String[] args) {
              // connect to your Atlas cluster
              String uri = "<connection-string>";

              try (MongoClient mongoClient = MongoClients.create(uri)) {
                  // set namespace
                  MongoDatabase database = mongoClient.getDatabase("sample_mflix");
                  MongoCollection<Document> collection = database.getCollection("movies");

                  Document index = new Document("mappings",
                          new Document("dynamic", true));
                  collection.createSearchIndex(index);
              }
          }
      }

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

.. step:: Compile and run the file to create the index.

   .. code-block:: shell

      javac CreateIndex.java
      java CreateIndex
