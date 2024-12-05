.. procedure:: 
   :style: normal 

   .. step:: Create your Java project and install dependencies.

      a. From your IDE, create a Java project named ``local-rag-mongodb`` using Maven or Gradle.

      #. Add the following dependencies:

         - If you are using Maven, add the following dependencies to the
           ``dependencies`` array in your project's ``pom.xml`` file:

           .. code-block:: javascript
              :caption: pom.xml

              <dependencies>
                <!-- MongoDB Java Sync Driver v5.2.0 or later -->
                <dependency>
                  <groupId>org.mongodb</groupId>
                  <artifactId>mongodb-driver-sync</artifactId>
                  <version>[5.2.0,)</version>
                </dependency>
                <!-- Java library for working with Ollama -->
                <dependency>
                  <groupId>dev.langchain4j</groupId>
                  <artifactId>langchain4j-ollama</artifactId>
                  <version>0.35.0</version>
                </dependency>
              </dependencies>

         - If you are using Gradle, add the following to the ``dependencies``
           array in your project's ``build.gradle`` file:

           .. code-block:: json
              :caption: build.gradle

              dependencies {
                 // MongoDB Java Sync Driver v5.2.0 or later
                 implementation 'org.mongodb:mongodb-driver-sync:[5.2.0,)'
                 // Java library for working with Ollama
                 implementation 'dev.langchain4j:langchain4j-ollama:0.35.0'
              }

      #. Run your package manager to install the dependencies to your project.

   .. step:: Set your environment variable.

      .. note::

         This example sets the variable in the IDE. Production
         applications might manage environment variables through a deployment
         configuration, CI/CD pipeline, or secrets manager, but you can adapt
         the provided code to fit your use case.

      .. include:: /includes/avs-examples/shared/avs-set-env-java.rst

         ``ATLAS_CONNECTION_STRING=<connection-string>``

         Replace the ``<connection-string>`` with one of the following
         connection strings, depending on your deployment type:

      .. tabs::

         .. tab:: Local {+Deployment+}
            :tabid: local

            Replace the ``<port-number>`` with the port for your local {+deployment+}.

            Your connection string should follow the following format:

            .. code-block:: shell

               ATLAS_CONNECTION_STRING = "mongodb://localhost:<port-number>/?directConnection=true"

         .. tab:: Cloud {+Deployment+}
            :tabid: cloud

            .. include:: /includes/avs-examples/shared/avs-replace-connection-string.rst
