.. step:: Create your Java project and install dependencies.

   a. From your IDE, create a Java project using Maven or Gradle.
   #. Add the following dependencies, depending on your package manager:

      .. tabs::

          .. tab:: Maven
             :tabid: maven

             If you are using Maven, add the following dependencies to the
             ``dependencies`` array in your project's ``pom.xml`` file:

             .. code-block:: xml
                :caption: pom.xml

                <dependencies>
                    <dependency>
                        <groupId>junit</groupId>
                        <artifactId>junit</artifactId>
                        <version>4.13.2</version>
                        <scope>test</scope>
                    </dependency>
                    <dependency>
                        <groupId>org.mongodb</groupId>
                        <artifactId>mongodb-driver-sync</artifactId>
                        <version>5.3.1</version>
                    </dependency>
                    <dependency>
                        <groupId>org.slf4j</groupId>
                        <artifactId>slf4j-api</artifactId>
                        <version>2.0.16</version>
                    </dependency>
                    <dependency>
                        <groupId>org.slf4j</groupId>
                        <artifactId>slf4j-simple</artifactId>
                        <version>2.0.16</version>
                        <scope>test</scope>
                    </dependency>
                    <dependency>  
                        <groupId>org.json</groupId>  
                        <artifactId>json</artifactId>  
                        <version>20250517</version>  
                    </dependency>
                    <dependency>
                        <groupId>com.squareup.okhttp3</groupId>
                        <artifactId>okhttp</artifactId>
                        <version>4.12.0</version>
                    </dependency>
               </dependencies>

          .. tab:: Gradle
             :tabid: gradle

             If you are using Gradle, add the following to the ``dependencies``
             array in your project's ``build.gradle`` file:

             .. code-block:: json
                :caption: build.gradle

                dependencies {  
                    // JUnit for testing  
                    testImplementation 'junit:junit:3.8.1'  
                
                    // MongoDB synchronous driver  
                    implementation 'org.mongodb:mongodb-driver-sync:5.3.1'  
                
                    // SLF4J API for logging  
                    implementation 'org.slf4j:slf4j-api:2.0.16'  
                
                    // SLF4J Simple Logger (scope: test)  
                    testImplementation 'org.slf4j:slf4j-simple:2.0.16'  
                
                    // JSON library  
                    implementation 'org.json:json:20210307'  

                    // HTTP client for Java
                    implementation 'com.squareup.okhttp3:okhttp:4.12.0' // Or the latest version
                }  

   #. Run your package manager to install the dependencies to your project.

.. step:: Set your environment variables.

   .. note::

      This example sets the variables for the project in the IDE. Production
      applications might manage environment variables through a deployment
      configuration, CI/CD pipeline, or secrets manager, but you can adapt
      the provided code to fit your use case.

   .. include:: /includes/avs/shared/avs-set-env-java.rst

   .. code-block:: shell
       :caption: Environment variables

       VOYAGE_API_KEY=<api-key>
       MONGODB_URI=<connection-string>

   Update the placeholders with the following values:

   - Replace the ``<api-key>`` placeholder value with your |voyage| API key.
   - .. include:: /includes/search-shared/find-connection-string.rst