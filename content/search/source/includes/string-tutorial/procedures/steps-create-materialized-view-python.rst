.. procedure::
   :style: normal

   .. step:: Set up the Python project.

      .. literalinclude:: /includes/index/shared/code-snippets/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the materialized view.

      Create a new file in your project directory named
      ``create_materialized_view.py``, and copy and paste the following
      code into the file. 
      
      .. include:: /includes/string-tutorial/facts/fact-data-transformation.rst

      .. literalinclude:: /includes/string-tutorial/code-snippets/python/create_materialized_view.py
         :caption: create_materialized_view.py
         :language: python
         :linenos:
         :copyable:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_materialized_view.py

         .. output::
            :visible: false

            Materialized view created!