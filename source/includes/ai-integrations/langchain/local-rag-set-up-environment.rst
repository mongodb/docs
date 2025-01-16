.. procedure:: 
   :style: normal 

   .. step:: Create a directory to store your project.

      Run the following commands in your terminal 
      to create a new directory named ``local-rag-mongodb``.

      .. code-block:: console

         mkdir local-rag-mongodb
         cd local-rag-mongodb

   .. step:: Create an interactive Python notebook.
      
      In the ``local-rag-mongodb`` directory, save a file with the 
      ``.ipynb`` extension. You will run the remaining
      code snippets for this tutorial in your notebook. You must create
      a new code block for each snippet.

   .. step:: Install and import dependencies.

      Run the following command in your notebook:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb

      .. code-block:: python

         pip install --quiet --upgrade pymongo gpt4all sentence_transformers

   .. step:: Define your |service| connection string.

      .. tabs::

         .. tab:: Local {+Deployment+}
            :tabid: local

            If you're using a local |service| {+deployment+}, 
            run the following code in your notebook, replacing ``<port-number>`` 
            with the port for your local {+deployment+}.

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb
            
            .. code-block:: python

               ATLAS_CONNECTION_STRING = ("mongodb://localhost:<port-number>/?directConnection=true")

         .. tab:: Cloud {+Deployment+}
            :tabid: cloud

            If you're using an |service| {+cluster+}, 
            run the following code in your notebook, replacing ``<connection-string>``
            with your |service| {+cluster+}'s |srv| :manual:`connection string 
            </reference/connection-string/#find-your-mongodb-atlas-connection-string>`:

            ..
               NOTE: If you edit this Python code, also update the Jupyter Notebook
               at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb
            
            .. code-block:: python

               ATLAS_CONNECTION_STRING = ("<connection-string>")

            .. note:: 

               .. include:: /includes/fact-connection-string-format-drivers.rst