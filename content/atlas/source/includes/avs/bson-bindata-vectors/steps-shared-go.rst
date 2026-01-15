.. step:: Initialize your Go project.

   In a terminal window, run the following commands to create a new
   directory named ``ingest-binary-vectors`` and initialize your
   project: 
   
   .. code-block:: shell

      mkdir ingest-binary-vectors-project
      cd ingest-binary-vectors-project
      go mod init ingest-binary-vectors-project

.. step:: Install the required libraries.

   Run the following command to install the MongoDB :driver:`Go
   Driver </go/current/>`. This operation might take a few 
   minutes to complete.

   .. code-block:: python 

      go get go.mongodb.org/mongo-driver/v2/mongo
    
   You must install :driver:`Go </go/current/>` v2.1 or later
   driver. If necessary, you can also install libraries from your
   embedding model provider. For examples in this tutorial, we will use
   the Voyage AI REST API to generate embeddings. Therefore, you don't
   need to install any additional libraries.

.. step:: Set the environment variables in your terminal.

   a. To access the embedding model provider for generating
      and converting embeddings, set the environment variable for the
      embedding model provider's API key, if necessary.
       
      For using embeddings from |voyage|, set up the ``VOYAGE_API_KEY``
      environment variable. To learn how to get your API key, see 
      :ref:`voyage-api-keys`. 

      .. code-block:: 

         export VOYAGE_API_KEY="<VOYAGE-API-KEY>"

   #. To access your cluster, set the ``MONGODB_URI``
      environment variable. 

      .. code-block:: shell 

         export MONGODB_URI="<CONNECTION-STRING>"

      Your connection string should be in the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
