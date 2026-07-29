.. procedure:: 
   :style: normal

   .. step:: Add the PyMongo Driver as a dependency in your project:

      .. code-block:: sh

         pip install pymongo

      For more detailed installation instructions, see the 
      :ref:`MongoDB Python Driver documentation <pymongo-get-started-download-and-install>`.

   .. step:: Define the index.

      Create a file named ``vector-index.py``. Copy and paste the following
      code into the file.

      .. NOTE: If you edit this Python file, also update the Jupyter Notebook at https://github.com/mongodb/docs-notebooks/blob/main/get-started/quick-start.ipynb

      .. literalinclude:: /includes/unionwith/code-snippets/vector/python/create-index.py
         :language: python
         :copyable: true
         :caption: vector-index.py
         :emphasize-lines: 6
         :linenos:

      .. include:: /includes/unionwith/facts/vector/index-definition.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            python vector-index.py

         .. output::  
            :language: console
            :visible: false

            New search index named multiple-vector-search is building.
            Polling to check if the index is ready. This may take up to a minute.
            multiple-vector-search is ready for querying.
