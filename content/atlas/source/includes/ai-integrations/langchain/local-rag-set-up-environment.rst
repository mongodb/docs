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
      the directory named ``local-rag.ipynb``.
      
      .. code-block:: shell

         touch local-rag.ipynb

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      .. code-block:: python

         pip install --quiet --upgrade pymongo gpt4all sentence_transformers

   .. step:: Define your connection string.

      Run the following code in your notebook, replacing ``<port-number>`` 
      with the port for your local {+deployment+}.
      
      .. code-block:: python

         MONGODB_URI = ("mongodb://localhost:<port-number>/?directConnection=true")
