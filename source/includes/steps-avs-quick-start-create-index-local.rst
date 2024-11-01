
.. procedure:: 
   :style: normal 

   .. step:: Install the dependencies.

      a. Install the :atlascli:`{+atlas-cli+} </install-atlas-cli/>`
         and :dbtools:`MongoDB Database Tools </installation/installation/>`.

         If you use `Homebrew <https://brew.sh/#install>`__, you can
         run the following commands in your terminal:

         .. code-block::

            brew install mongodb-atlas-cli
            brew tap mongodb/brew && brew install mongodb-database-tools

      #. Install `Docker <https://www.docker.com/>`__.

         - For MacOS or Windows, install `Docker Desktop v4.31+ <https://docs.docker.com/desktop/release-notes/#4310>`__. 
         - For Linux, install `Docker Engine v27.0+ <https://docs.docker.com/engine/release-notes/27.0/>`__.

      For detailed instructions, see :atlascli:`Prerequisites 
      </atlas-cli-deploy-local/#complete-the-prerequisites>`.

   .. step:: Set up your local |service| {+deployment+}.

      a. If you don't have an existing |service| account, run ``atlas setup`` in your terminal
         or `create a new account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

      #. In your terminal, run ``atlas auth login`` to authenticate with your 
         |service| login credentials. To learn more, see 
         :atlascli:`Connect from the {+atlas-cli+} </connect-atlas-cli/>`.

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

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: shell

            .. include:: /includes/avs-quick-start-mongosh-local-create-index.rst

         .. tab::
            :tabid: c

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: cpp

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: csharp

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: go

            .. include:: /includes/avs-quick-start-go-create-index.rst

         .. tab::
            :tabid: java-sync

            .. include:: /includes/avs-quick-start-java-create-index.rst

         .. tab::
            :tabid: kotlin-coroutine

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: kotlin-sync

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: nodejs

            .. include:: /includes/avs-quick-start-javascript-create-index.rst

         .. tab::
            :tabid: php

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: python

            .. include:: /includes/avs-quick-start-python-create-index.rst

         .. tab::
            :tabid: ruby

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: rust

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst

         .. tab::
            :tabid: scala

            .. include:: /includes/avs-quick-start-local-create-index-with-json.rst
