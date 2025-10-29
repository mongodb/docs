.. procedure:: 
   :style: normal 

   .. step:: Create a directory to store your project.

      Run the following commands in your terminal 
      to create a new directory named ``local-rag-mongodb``.

      .. code-block:: console

         mkdir local-rag-mongodb
         cd local-rag-mongodb

   .. step:: Create an interactive Python notebook.

      The following command creates a notebook in 
      the directory named ``langchain-local-rag.ipynb``.
      
      .. code-block:: console

         touch langchain-local-rag.ipynb

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      .. code-block:: python

         pip install --upgrade --quiet langchain langchain-mongodb langchain-text-splitters pymongo sentence-transformers gpt4all

   .. step:: Set your MongoDB connection string.

            .. code-block:: python

               MONGODB_URI = ("mongodb://localhost:<port-number>/?directConnection=true")
