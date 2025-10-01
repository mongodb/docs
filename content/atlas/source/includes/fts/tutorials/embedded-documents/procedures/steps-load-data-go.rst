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

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 
      
      .. literalinclude:: /includes/fts/field-types/initialize-project-go.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Create and populate the collections.

      Create and populate the ``schools`` collection:
    
      .. literalinclude:: /includes/fts/tutorials/embedded-documents/sample-data.go
         :language: go
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Run the ``go`` program to create the collection.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run file_name.go

         .. output::
            :visible: false

            Schools collection successfully created and populated.