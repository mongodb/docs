.. procedure::
   :style: normal

   .. step:: Add the PyMongo Driver as a dependency in your project:

      .. code-block:: sh

         pip install pymongo

      For more detailed installation instructions, see the
      :ref:`MongoDB Python Driver documentation <pymongo-get-started-download-and-install>`.

   .. step:: Define the indexes.

      a. Create files named ``auto-embed-index.py``. 
      
      #. Copy and paste the following code into the ``auto-embed-index.py`` file.

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/python/create-index.py
            :language: python
            :copyable: true
            :caption: auto-embed-index.py
            :emphasize-lines: 6
            :linenos:

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-auto-embed.rst

         .. include:: /includes/unionwith/facts/auto-embed/index-definition-vector.rst

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Create the indexes.

      a. Create the indexes.

         .. io-code-block::
            :copyable: true

            .. input::
               :language: shell

               python auto-embed-index.py

            .. output::
               :language: console
               :visible: false

               New search index named multiple-auto-embed-search is building.
               New search index named multiple-models-search is building.
               Polling to check if the index is ready. This may take up to a minute.
               multiple-auto-embed-search is ready for querying.
               multiple-models-search is ready for querying.