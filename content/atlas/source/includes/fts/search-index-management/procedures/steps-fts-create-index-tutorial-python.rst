a. Install the MongoD Python Driver.

   .. code-block:: sh

      pip install pymongo

   For detailed installation instructions, see 
   :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

#. Define the index.

   Create a file named ``create_index.py``. Copy and paste the following
   code into the file.
   
   .. literalinclude:: /includes/fts/search-index-management/python/create-index-tutorial.py
      :caption: create_index.py
      :language: python
      :copyable:
   
#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create the index.

   .. io-code-block::
      :copyable: true 

      .. input::
         :language: shell

         python create_index.py

      .. output::

         default
