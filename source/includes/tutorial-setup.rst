.. _kafka-tutorials-setup:

Before You Get Started
----------------------

The tutorials in this section use a Docker development environment to
package the dependencies and configurations you need to run the
{+connector-long+}.

Requirements
~~~~~~~~~~~~

To download the Docker containers you need for this tutorial, you must have
a Docker account. To learn how to sign up for an account and install Docker
Desktop, read the `Docker Hub Quickstart <https://docs.docker.com/docker-hub/>`__.

While not required, we recommend that you use **git** to download the setup
files. To learn how to install git, read the `Git Downloads <https://git-scm.com/downloads>`__
page.

Install the Docker Development Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to set up your development environment
for this tutorial.

.. procedure::
   :style: connected

   .. step:: Download the Tutorial Docker Image

      Download the `tutorial docker image <https://hub.docker.com/repository/docker/robwma/mongokafkatutorial>`__
      from Docker Hub which contains command line tools to interact with
      MongoDB, Apache Kafka, and the connectors.

      Run the following command:

      .. code-block:: bash
         :copyable: true

         docker pull robwma/mongokafkatutorial

   .. step:: Clone or Download the Tutorial Repository

      Next, clone the tutorial git repository with the following command:

      .. code-block:: bash
         :copyable: true

         git clone https://github.com/mongodb-university/kafka-edu/

      If you do not have git installed, you can download the
      `zip archive <https://github.com/mongodb-university/kafka-edu/archive/refs/heads/main.zip>`__
      instead.

   .. step:: Run the Development Environment

      Navigate to the tutorial directory "mongodb-kafka-base" within the
      repository or unzipped archive.  If you cloned the repository with git,
      your command resembles the following:

      .. code-block:: bash
         :copyable: true

         cd kafka-edu/docs-examples/source/mongodb-kafka-base/

      Start the Docker image with the following command:

      .. code-block:: bash
         :copyable: true

          sh run.sh

      If you are running Windows, use the following PowerShell command instead:

      .. code-block:: bash
         :copyable: true

         powershell.exe .\run.ps1

      .. note::

         If the script exits with the message "Please terminate the local
         mongod on 27017", you must terminate the process that is listening
         on port 27017 before you can continue. After you terminate the
         process, run the script again.

         If you previously started the image in Docker Desktop and have not
         stopped it, the image automatically starts when you launch Docker
         Desktop. If the image is already running, you can proceed to the
         next step.

      When the script completes successfully, it outputs the following
      information:

      .. code-block:: bash
         :copyable: false

         The following services are running:

         MongoDB 3-node cluster available on port 27017
         Kafka Broker on 9092
         Kafka Zookeeper on 2181
         Kafka Connect on 8083

   .. step:: Verify the Successful Setup

      Confirm the development environment started normally by running the
      following command from the "mongodb-kafka-base" directory:

      .. code-block:: bash

         sh status.sh

      If you are running Windows, use the following PowerShell command instead:

      .. code-block::
         :copyable: true

         powershell.exe .\status.ps1

      This command should output the following information if the Docker
      development environment was set up successfully:

      .. code-block:: bash
         :copyable: false

         Kafka topics:

         [
           <list of kafka topics>
         ]

         The status of the connectors:

         Currently configured connectors

         []

         Version of MongoDB Connector for Apache Kafka installed:

         {"class":"com.mongodb.kafka.connect.MongoSinkConnector","type":"sink","version":"<version>"}
         {"class":"com.mongodb.kafka.connect.MongoSourceConnector","type":"source","version":"<version>"}

      Since you have not started the connectors, the status and configured
      list are empty.

      Your development environment setup is complete and you can proceed to
      the next step of the tutorial.

