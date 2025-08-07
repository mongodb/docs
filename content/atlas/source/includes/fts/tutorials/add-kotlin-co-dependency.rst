In your IDE, create a new `Maven <https://maven.apache.org/>`__ or
`Gradle <https://gradle.org/>`__ project. Add the Bill of
Materials (BOM) for MongoDB JVM artifacts to your project to
organize dependency versions. The BOM simplifies dependency
management by ensuring that you maintain consistent and compatible
versions of dependencies, such as between the Java driver and
the core driver library. Use the BOM to avoid version conflicts
and simplify upgrades.

Select from the following **Maven** and **Gradle** tabs
to view instructions for adding the BOM for each dependency manager:

.. tabs::

   .. tab:: Maven
      :tabid: maven bom
      
      Add the following code to the ``dependencyManagement`` list in your
      ``pom.xml`` file:

      .. code-block:: xml

         <dependencyManagement>
             <dependencies>
                 <dependency>
                     <groupId>org.mongodb</groupId>
                     <artifactId>mongodb-driver-bom</artifactId>
                     <version>5.5.1</version>
                     <type>pom</type>
                     <scope>import</scope>
                 </dependency>
             </dependencies>
         </dependencyManagement> 

   .. tab:: Gradle
      :tabid: gradle bom

      Add the following code to the dependencies list in your
      ``build.gradle`` file:

      .. code-block:: groovy

         dependencies {
             implementation(platform("org.mongodb:mongodb-driver-bom:5.5.1"))
         }

To view a list of dependencies that the BOM manages, see
the `mongodb-driver-bom dependency listing
<https://mvnrepository.com/artifact/org.mongodb/mongodb-driver-bom/5.51>`__
on the Maven Repository website.

After adding the BOM, select from the following **Maven** and **Gradle** tabs to view 
instructions for adding the MongoDB Kotlin Coroutine Driver as a dependency
in your project: 

.. tabs::

   .. tab:: Maven
      :tabid: maven

      Add the following code to the ``dependencies`` array in your Maven
      project's ``pom.xml`` file:

      .. literalinclude:: /includes/fts/tutorials/maven-kotlin-co-dependency.xml
         :language: xml
         :caption: pom.xml
         :copyable: true

   .. tab:: Gradle
      :tabid: gradle

      Add the following to the ``dependencies`` array in your Gradle 
      project's ``build.gradle`` file:

      .. literalinclude:: /includes/fts/tutorials/gradle-kotlin-co-dependency.xml
         :language: json
         :caption: build.gradle
         :copyable: true

Run your package manager to install the dependencies to your project.