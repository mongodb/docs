

.. procedure:: 
   :style: normal 

   .. step:: Install the dependencies.

      For detailed instructions, see :atlascli:`Prerequisites 
      </atlas-cli-deploy-local/#complete-the-prerequisites>`.

      a. Install the :atlascli:`{+atlas-cli+} </install-atlas-cli/>`.

         If you use `Homebrew <https://brew.sh/#install>`__, you can
         run the following command in your terminal:

         .. code-block::

            brew install mongodb-atlas-cli
               
         For installation instructions on other operating systems,
         see :atlascli:`Install the {+atlas-cli+} </install-atlas-cli/>`

      #. Install `Docker <https://www.docker.com/>`__.

         Docker requires a network connection for pulling and caching 
         MongoDB images.

         - For MacOS or Windows, install `Docker Desktop v4.31+ <https://docs.docker.com/desktop/release-notes/#4310>`__. 
         - For Linux, install `Docker Engine v27.0+ <https://docs.docker.com/engine/release-notes/27.0/>`__.
         - For RHEL, you can also use `Podman v5.0+ <https://podman.io>`__.

   .. step:: Set up your local |service| {+deployment+}.

      a. If you don't have an existing |service| account, run ``atlas setup`` in your terminal
         or `create a new account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

      #. Run ``atlas deployments setup`` and follow the prompts to create a 
         local deployment. When prompted to connect to the deployment,
         select ``skip``.
            
         For detailed instructions, see :atlascli:`Create a Local Atlas Deployment 
         </atlas-cli-deploy-local/#create-a-local-atlas-deployment-1>`.

   .. step:: Load the sample data.

      a. Run the following command in your terminal to download the sample data:

         .. code-block:: 

            curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive

      #. Run the following command to load the data into your {+deployment+},
         replacing ``<port-number>`` with the port where you're hosting the 
         {+deployment+}:

         .. code-block:: 

            mongorestore --archive=sampledata.archive --port=<port-number>

   .. step:: Create a Vector Search index.

      .. tabs-drivers::

         .. tab::
            :tabid: atlas-ui

            .. include:: /includes/avs/tutorial/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: shell

            .. include:: /includes/avs/tutorial/avs-quick-start-mongosh-local-create-index.rst

         .. tab::
            :tabid: c

            .. include:: /includes/avs/tutorial/avs-quick-start-c-create-index.rst

         .. tab::
            :tabid: cpp

            .. include:: /includes/avs/tutorial/avs-quick-start-cpp-create-index.rst

         .. tab::
            :tabid: csharp

            .. include:: /includes/avs/tutorial/avs-quick-start-csharp-create-index.rst

         .. tab::
            :tabid: go

            .. include:: /includes/avs/tutorial/avs-quick-start-go-create-index.rst

         .. tab::
            :tabid: java-sync

            .. include:: /includes/avs/tutorial/avs-quick-start-java-create-index.rst

         .. tab::
            :tabid: kotlin-coroutine

            .. include:: /includes/avs/tutorial/avs-quick-start-kotlin-coroutine-create-index.rst

         .. tab::
            :tabid: kotlin-sync

            .. include:: /includes/avs/tutorial/avs-quick-start-kotlin-sync-create-index.rst

         .. tab::
            :tabid: nodejs

            .. include:: /includes/avs/tutorial/avs-quick-start-javascript-create-index.rst

         .. tab::
            :tabid: php

            .. include:: /includes/avs/tutorial/avs-quick-start-php-create-index.rst

         .. tab::
            :tabid: python

            .. include:: /includes/avs/tutorial/avs-quick-start-python-create-index.rst

         .. tab::
            :tabid: ruby

            .. include:: /includes/avs/tutorial/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: rust

            .. include:: /includes/avs/tutorial/avs-quick-start-rust-create-index.rst

         .. tab::
            :tabid: scala

            .. include:: /includes/avs/tutorial/avs-quick-start-scala-create-index.rst
