.. procedure::
   :style: normal

   .. step:: Install the MongoDB Python Driver.

      .. code-block:: sh

         pip install pymongo

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the index.

      Paste the following code into a file named ``create_index.py``.
      
      .. literalinclude:: /includes/tutorial/code-snippets/python/create-index-tutorial.py
         :caption: create_index.py
         :language: python
         :emphasize-lines: 5
         :copyable:
         :linenos:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_index.py

         .. output::

            default
