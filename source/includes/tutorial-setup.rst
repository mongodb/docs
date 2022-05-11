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

.. note::

   The development environment takes up <TODO> of disk space. Make sure
   you have sufficient space.

.. procedure::
   :style: normal


   .. step:: Download the Tutorial Docker Image

      Download the `tutorial docker image <https://hub.docker.com/repository/docker/robwma/mongokafkatutorial>`__
      from Docker Hub. The command to download it should resemble the following:

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

      When the script completes successfully, it outputs the following
      information:

      .. code-block:: bash

         Kafka Connectors status:
         <status information>
         Version of MongoDB Connector for Apache Kafka installed
         <version information>

   .. step:: Verify the Successful Setup

      Confirm the development environment started normally, run the following
      command from the "mongodb-kafka-base" directory:

      .. code-block:: bash

         sh status.sh

      If you are running Windows, use the following PowerShell command instead:

      .. code-block::
         :copyable: true

         powershell.exe .\status.ps1

      The command should output the following information if the Docker
      development environment was set up successfully:

      .. code-block:: bash

         MongoDB: <MongoDB version>

      Your development environment setup is complete and you can proceed to
      the next step of the tutorial.

