Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the index.

      Create a ``create_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/fts/field-types/autocomplete/create_index.py
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
