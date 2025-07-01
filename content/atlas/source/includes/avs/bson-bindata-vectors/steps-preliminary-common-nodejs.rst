.. step:: Install the required libraries.

   Run the following command to install the MongoDB :driver:`Node.js
   Driver </node/current/>`. This operation might take a few 
   minutes to complete.

   .. code-block:: python 

       npm install mongodb
    
   You must install :driver:`Node.js </node/current/>` v6.11 or later
   driver. If necessary, you can also install libraries from your
   embedding model provider. For example, to generate ``float32``,
   ``int8``, and ``int1`` embeddings by using Cohere as demonstrated
   in this page, install Cohere:
 
   .. code-block:: python 

      npm install cohere-ai dotenv
      npm show cohere-ai version

.. step:: Set the environment variables in your terminal.

   a. To access the embedding model provider for generating
      and converting embeddings, set the environment variable for the
      embedding model provider's API key, if necessary.
       
      For using embeddings from Cohere, set up the ``COHERE_API_KEY``
      environment variable. 

      .. code-block:: 

         export COHERE_API_KEY="<COHERE-API-KEY>"

      If you don't set the environment variable, replace the
      ``<COHERE-API-KEY>`` in the sample code with the API key before
      running the code.  

   #. To access |service| {+cluster+}, set the ``MONGODB_URI``
      environment variable. 

      .. code-block:: shell 

         export MONGODB_URI="<CONNECTION-STRING>"

      Your connection string should be in the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

      If you don't set the environment variable, replace the
      ``<CONNECTION-STRING>`` in the sample code with your connection
      string before running the code.
