Create a Sample Collection and Load the Data 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must begin by creating a collection named ``schools`` in an 
existing or new database on your cluster. After creating the 
collection, you must upload the sample data into your collection. To
learn more about the documents in the sample collection, see
:ref:`embedded-documents-tutorial-sample-collection`. 

The steps in this section walk you through creating a new database 
and collection, and loading the sample data into your collection.

.. procedure::
   :style: normal

   .. step:: Set up the Python project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Create and populate the collections.

      Create and populate the ``schools`` collection:
    
      .. literalinclude:: /includes/fts/tutorials/embedded-documents/sample-data.py 
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python file_name.py

         .. output::
            :visible: false

            Schools collections successfully created and populated.