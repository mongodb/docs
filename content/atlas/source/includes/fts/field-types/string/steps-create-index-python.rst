Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal
   
   .. step:: Install the MongoDB Python Driver.

      .. literalinclude:: /includes/fts/field-types/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the index.

      Paste the following code into a file named ``create_index.py``.

      .. literalinclude:: /includes/fts/field-types/string/create_index.py
         :caption: create_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_index.py

         .. output::
            :visible: false

            New index name: default
