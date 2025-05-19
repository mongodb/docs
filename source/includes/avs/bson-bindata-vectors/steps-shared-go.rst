.. step:: Install the required libraries.

   Run the following command to install the MongoDB :driver:`Go
   Driver </go/current/>`. This operation might take a few 
   minutes to complete.

   .. code-block:: python 

       go get go.mongodb.org/mongo-driver/v2/mongo
    
   You must install :driver:`Go </go/current/>` v2.1 or later
   driver. If necessary, you can also install libraries from your
   embedding model provider. For example, to generate ``float32``,
   ``int8``, and ``int1`` embeddings by using Cohere as demonstrated
   in this page, install Cohere:
 
   .. code-block:: python 

      go get github.com/cohere-ai/cohere-go/v2/client@v2.13.0

.. step:: Initialize your Go project.

   In a terminal window, run the following commands to create a new
   directory named ``ingest-binary-vectors`` and initialize your
   project: 
   
   .. code-block:: shell

      mkdir ingest-binary-vectors-project
      cd ingest-binary-vectors-project
      go mod init ingest-binary-vectors-project

.. step:: Set the environment variables in your terminal.

   a. To access the embedding model provider for generating
      and converting embeddings, set the environment variable for the
      embedding model provider's API key, if necessary.
       
      For using embeddings from Cohere, set up the ``COHERE_API_KEY``
      environment variable. 

      .. code-block:: 

         export COHERE_API_KEY="<COHERE-API-KEY>"

   #. To access |service| {+cluster+}, set the ``MONGODB_URI``
      environment variable. 

      .. code-block:: shell 

         export MONGODB_URI="<CONNECTION-STRING>"

      Your connection string should be in the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
