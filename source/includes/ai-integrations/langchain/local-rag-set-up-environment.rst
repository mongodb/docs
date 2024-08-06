.. procedure::
   :style: normal

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: python

         pip install --quiet langchain langchain_community langchain_huggingface langchain-mongodb pymongo sentence-transformers gpt4all

   .. step:: Define your |service| connection string.

      .. tabs::

         .. tab:: Local {+Deployment+}
            :tabid: local

            If you're using a local |service| {+deployment+}, 
            run the following code in your notebook, replacing ``<port-number>`` 
            with the port for your local {+deployment+}.
            
            .. code-block:: python

               ATLAS_CONNECTION_STRING = ("mongodb://localhost:<port-number>/?directConnection=true")

         .. tab:: Cloud {+Deployment+}
            :tabid: cloud

            If you're using an |service| {+cluster+}, 
            run the following code in your notebook, replacing ``<connection-string>``
            with your |service| {+cluster+}'s |srv| :manual:`connection string 
            </reference/connection-string/#find-your-mongodb-atlas-connection-string>`:
            
            .. code-block:: python

               ATLAS_CONNECTION_STRING = ("<connection-string>")

            .. note:: 

               Your connection string should use the following format:

               .. code-block::

                  mongodb+srv://<username>:<password>@<clusterName>.<hostname>.mongodb.net
                  