.. _unified-get-started:

===========
Get Started
===========

.. meta:: 
   :description: How to create an Atlas cluster, connect to it, and load sample data using the Atlas CLI and your preferred programming language.
   :keywords: atlas cli, atlas ui, setup, getting started, beginner, tutorial

.. facet::
   :name: genre
   :values: tutorial

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

In this guide, you will learn how to create a {+atlas+}
deployment locally or in the cloud. Then, you will learn how
to create an application that connects to your deployment. To
learn how to install MongoDB Community or MongoDB Enterprise
editions on your own infrastructure, see the :manual:`Install MongoDB
</installation>` guide.

Create a {+atlas+} Deployment
---------------------------------

This section shows how to set up a local or cloud {+atlas+}
deployment and connect to the deployment by using the
{+mdb-shell+}.

.. procedure::

   .. step:: Install dependencies

      Before you begin this tutorial, you must install
      the following dependencies in your development
      environment:

      - **{+atlas-cli+}**: Command-line interface that allows you to manage
        your deployments from the terminal
      - **{+mdb-shell+}**: Interactive tool that connects to a deployment and
        provides database operation support
      - **Docker**: Platform that allows you to run software within containers,
        including local MongoDB deployments

      Select the tab corresponding to your operating system
      to view the commands that install these required development
      tools.
      
      .. tabs::

         .. tab:: macOS
            :tabid: macos

            Run the following commands to install the dependencies
            by using the Homebrew package manager. If you do not have
            Homebrew, you can install it by following the instructions on the
            `Homebrew website <https://brew.sh/>`__.            

            .. code-block:: shell

               brew install mongodb-atlas
               brew install --cask docker
            
         .. tab:: Windows
            :tabid: windows

            Run the following commands to install the dependencies
            by using the Chocolatey package manager. If you do not
            have Chocolatey, you can install it by following the instructions
            on the `Chocolatey website <https://chocolatey.org/install>`__.

            .. code-block:: shell

               choco install mongodb-atlas
               choco install docker-desktop

      For other ways to install the {+atlas-cli+}, see :atlas:`Atlas
      CLI install page </cli/current/install-atlas-cli>`.

      .. note:: Docker Desktop

         The preceding commands install the `Docker Desktop <https://docs.docker.com/desktop/>`__
         application. After the installation completes, ensure that you create
         a Docker account and start the application.

   .. step:: Set up a fully-featured deployment

      Run the following command and follow the prompts in the shell to deploy a cluster. 
      If you do not have an {+service+} account, the following command
      prompts you to create one.

      .. tabs::

         .. tab:: Local Deployment
            :tabid: local

            This command creates a single-member replica set in a container 
            that runs on your local machine.

            .. literalinclude:: /get-started/includes/deploy-commands.sh
               :language: shell
               :start-after: # start-deploy-local
               :end-before: # end-deploy-local

            .. note::
            
               Replace the ``<port number>`` placeholder with the port
               you want to use. The default port is ``27017``, but you
               can specify a different port if ``27017`` is not available.

            The command outputs the following information:
         
            .. code-block:: bash
               :copyable: false

               Deployment created!
               Connection string: "<connection string URI>"

            Save the connection string URI for use in a future step.

         .. tab:: Cloud Deployment
            :tabid: cloud

            This command creates a free tier cluster on {+atlas+}.

            .. literalinclude:: /get-started/includes/deploy-commands.sh
               :language: shell
               :start-after: # start-deploy-cloud
               :end-before: # end-deploy-cloud
            
            .. note::

               Replace the following placeholder values to create a new
               :atlas:`database user </security-add-mongodb-users>` with
               :atlas:`atlasAdmin </mongodb-users-roles-and-privileges/#mongodb-atlasrole-Atlas-admin>`
               privileges in your deployment:

               - ``<database username>``: Specify a username for your new database user
               - ``<database user password>``: Specify a password for your new database user

            The command outputs the following information:

            .. code-block:: bash
               :copyable: false

               Cluster created.
               Your connection string: "<connection string URI>"

            Save the connection string URI for use in a future step.

   .. step:: Connect to your deployment

      You can connect to your deployment with the {+mdb-shell+} (``mongosh``) by running the
      following command:

      .. tabs::

         .. tab:: Local Deployment
            :tabid: local

            .. code-block:: shell

               atlas deployments connect myDeployment --connectWith mongosh

         .. tab:: Cloud Deployment
            :tabid: cloud

            .. code-block:: shell

               atlas deployments connect myDeployment --username <database username> \
               --password <database user password> --connectWith mongosh

            .. note::

               Replace the ``<database username>`` and ``<database user password>`` placeholders
               with the username and password you created for your database user.

      After connecting, you can run the following command to test
      your connection:

      .. code-block:: shell

         show dbs

      The command returns a list of databases in your deployment.
      
Congratulations! You have successfully set up your {+atlas+}
deployment and connected to it. To learn more about how to interact with your
deployment by using the {+mdb-shell+}, see the :mongosh:`{+mdb-shell+}
documentation </reference/methods/>`. 

In the next section, you will learn how to create an application that
connects to your deployment and interacts with data.

Create Your First MongoDB Application
-------------------------------------

To connect to your {+atlas+} deployment in an application, you can
use one of the official `MongoDB client libraries
<https://www.mongodb.com/docs/drivers/>`__. 

Select your preferred programming language from the following dropdown menu
to learn how to connect to your {+atlas+} deployment in that language.

.. tip::

   Before running the steps in this section, ensure that you exit the MongoDB Shell 
   by running the ``exit`` command.

.. composable-tutorial::
   :options: language
   :defaults: nodejs

   .. selected-content::
      :selections: nodejs

      .. include:: /get-started/node/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with JavaScript
            <https://www.mongodb.com/docs/languages/javascript/>`__

   .. selected-content::
      :selections: python

      .. include:: /get-started/python/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Python
            <https://www.mongodb.com/docs/languages/python/>`__

   .. selected-content::
      :selections: java-sync

      .. include:: /get-started/java-sync/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Java
            <https://www.mongodb.com/docs/languages/java/>`__

   .. selected-content::
      :selections: java-async

      .. include:: /get-started/java-rs/language-connection-steps.rst
      
      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Java
            <https://www.mongodb.com/docs/languages/java/>`__

   .. selected-content::
      :selections: csharp

      .. include:: /get-started/csharp/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with C#
            <https://www.mongodb.com/docs/languages/csharp/>`__

   .. selected-content::
      :selections: cpp

      .. include:: /get-started/cpp/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with C++
            <https://www.mongodb.com/docs/languages/cpp/>`__

   .. selected-content::
      :selections: go

      .. include:: /get-started/go/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Go
            <https://www.mongodb.com/docs/languages/go/>`__

   .. selected-content::
      :selections: kotlin

      .. include:: /get-started/kotlin-sync/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Kotlin
            <https://www.mongodb.com/docs/languages/kotlin/>`__
   
   .. selected-content::
      :selections: kotlin-coroutine

      .. include:: /get-started/kotlin-coroutine/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Kotlin
            <https://www.mongodb.com/docs/languages/kotlin/>`__

   .. selected-content::
      :selections: php

      .. include:: /get-started/php/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with PHP
            <https://www.mongodb.com/docs/languages/php/>`__

   .. selected-content::
      :selections: ruby

      .. include:: /get-started/ruby/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Ruby
            <https://www.mongodb.com/docs/languages/ruby/>`__

   .. selected-content::
      :selections: rust

      .. include:: /get-started/rust/language-connection-steps.rst

      .. include:: /get-started/includes/next-steps.rst

         .. replacement:: driver-landing-page

            `Explore more about MongoDB with Rust
            <https://www.mongodb.com/docs/languages/rust/>`__
