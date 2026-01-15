.. include:: /includes/avs/shared/steps-avs-nodejs-config-modules.rst

.. step:: Install the required libraries.

   Run the following command to install the MongoDB :driver:`Node.js
   Driver </node/current/>` and the ``dotenv`` package. This operation
   might take a few minutes to complete.

   .. code-block:: python 

       npm install mongodb dotenv
    
   You must install :driver:`Node.js </node/current/>` v6.11 or later
   driver.

   If necessary, you must also install libraries from your embedding
   model provider. In this tutorial, you use the Voyage AI REST API to
   generate embeddings. Therefore, you don't need to install any
   additional libraries for Voyage AI. 

.. step:: Initialize your Node.js project. 

   In a terminal window, run the following commands to create a new
   directory named ``my-quantization-project`` and initialize your
   project:  

   .. code-block:: shell 
      :copyable: true 

      mkdir my-quantization-project
      cd my-quantization-project
      npm init -y

.. step:: Set the environment variables in your terminal.

   a. To access the embedding model provider for generating
      and converting embeddings, set the environment variable for the
      embedding model provider's API key, if necessary.
       
      For using embeddings from |voyage|, set up the ``VOYAGE_API_KEY``
      environment variable. To learn how to get your API key, see 
      :ref:`voyage-api-keys`.

      .. code-block:: 

         export VOYAGE_API_KEY="<VOYAGEAI-API-KEY>"

      If you don't set the environment variable, replace the
      ``<VOYAGE-API-KEY>`` in the sample code with the API key before
      running the code.  

   #. To access your cluster, set the ``MONGODB_URI``
      environment variable. 

      .. code-block::  

         export MONGODB_URI="<CONNECTION-STRING>"

      Your connection string should be in the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

      If you don't set the environment variable, replace the
      ``<CONNECTION-STRING>`` in the sample code with your connection
      string before running the code.
