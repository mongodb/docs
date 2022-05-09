Before You Get Started
======================

.. procedure::
   :style: normal

   .. step:: Install the Docker Environment

      First, you need to retrieve the `tutorial docker image <https://hub.docker.com/repository/docker/robwma/mongokafkatutorial>`__
      from Docker Hub. If you do not have Docker Hub, follow the
      `Docker Hub installation instructions <https://docs.docker.com/docker-hub/>`__.

      Next, clone the tutorial git repository with the following command:

      .. code-block:: bash

         git clone --branch base-configuration https://github.com/mongodb-university/kafka-edu/

      Finally, navigate to the directory of the repository you cloned:

      .. code-block:: bash

         cd kafka-edu

   ..  step:: Run the Docker Environment

       Start the Docker image with the following command:

       ..
          TODO: if running windows, use powershell command powershell.exe .\run.ps1

       .. code-block:: bash

          sh run.sh

       If you currently have ``mongod`` running on port 27017, the script exits
       with the error "Please terminate the local mongod on 27017".

       If ``run.sh`` completes successfully, it should output the following:

       .. code-block:: bash

          Kafka Connectors status:
          ...
          Version of MongoDB Connector for Apache Kafka installed
          ...


   ..  step:: Verify the Docker Environment

       Confirm the environment is running using the following command:

       .. code-block:: bash

          sh status.h

       ..
          TODO: find out the windows version

       If the Docker Environment was set up successfully, the command outputs
       the following:

       .. code-block:: bash

          MongoDB: <MongoDB version>

       You can continue to the next step of the tutorial.
