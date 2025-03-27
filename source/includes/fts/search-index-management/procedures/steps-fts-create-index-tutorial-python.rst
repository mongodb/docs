.. procedure::
   :style: normal

   .. step:: Create a file named ``create_index.py``.
   
   .. step:: Copy and paste the following code into the ``create_index.py`` file.
      
      .. literalinclude:: /includes/fts/search-index-management/python/create-index-tutorial.py
         :caption: create_index.py
         :language: python
         :copyable:
      
   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Create the index.

      To create the index, run the following command:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            python create_index.py

         .. output::

            default
