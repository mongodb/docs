
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

         .. code-block:: sh

            curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive

      #. Run the following command to load the data into your {+deployment+},
         replacing ``<port-number>`` with the port where you're hosting the 
         {+deployment+}:

         .. code-block:: sh

            mongorestore --archive=sampledata.archive --port=<port-number>

   .. step:: Create a Vector Search index.

      a. Create a file named ``vector-index.json``

      #. Copy and paste the following index definition into the |json| file.

         .. code-block:: json
           :copyable: true 

           {
             "database": "sample_mflix",
             "collectionName": "embedded_movies",
             "type": "vectorSearch",
             "name": "vector_index",
               "fields": [
                 {
                   "type": "vector",
                   "path": "plot_embedding",
                   "numDimensions": 1536,
                   "similarity": "dotProduct"
                 }
               ]
           }

         This index definition:

         - Indexes the ``plot_embedding`` field as the ``vector`` type. 
           This field contains :term:`vector embeddings` that represent the summary of a 
           movie's plot.
         - Specifies ``1536`` :term:`vector dimensions <vector>`.
         - Measures :ref:`similarity <fields-similarity>` using ``dotProduct`` similarity.
         
      #. Save the file, and then run the following command
         in your terminal, replacing ``<path-to-file>`` with the path to the 
         ``vector-index.json`` file that you created.

         .. code-block:: sh
            :copyable: true 

            atlas deployments search indexes create --file <path-to-file>
