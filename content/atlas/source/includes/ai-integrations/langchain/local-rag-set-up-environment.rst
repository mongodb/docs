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

         pip install --quiet --upgrade pymongo gpt4all sentence_transformers atlas-local-lib-py

   .. step:: Create or reuse a local Atlas deployment.

      Run the following code in your notebook to create a new local {+deployment+}
      or reuse an existing one with matching configuration. This also retrieves
      the connection string programmatically.

      .. code-block:: python

         from atlas_local import LocalDeployment

         deployment = LocalDeployment.get_or_create(name="local-atlas-deployment")
         MONGODB_URI = deployment.connection_string()
