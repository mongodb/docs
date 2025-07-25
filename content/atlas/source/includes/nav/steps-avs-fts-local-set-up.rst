.. step:: Install the dependencies.

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

   #. Install the MongoDB Database Tools.

      You must install the `MongoDB Command Line Database Tools
      <https://fastdl.mongodb.org/tools/db/mongodb-database-tools-macos-arm64-100.10.0.zip>`__
      to access the ``mongorestore`` command, which you'll use to load the sample data.

.. step:: Set up your local |service| {+deployment+}.

   a. If you don't have an existing |service| account, run ``atlas setup`` in your terminal
      or `create a new account <https://account.mongodb.com/account/register>`__.

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