a. Set up and initialize the Go module.

   .. code-block:: 
      
      # Create a new directory and initialize the project
      mkdir atlas-search-quickstart && cd atlas-search-quickstart
      go mod init atlas-search-quickstart

   .. code-block:: 
     
      # Add the MongoDB Go Driver to your project
      go get go.mongodb.org/mongo-driver/v2/mongo

   For more detailed installation instructions, see the
   :ref:`MongoDB Go Driver documentation <go-get-started>`.

#. Define the index.

   Paste the following code into a file named ``create-index.go``.

   .. literalinclude:: /includes/fts/search-index-management/create-index.go
      :caption: create-index.go
      :language: go
      :emphasize-lines: 16
      :linenos:
      :copyable:

   .. include:: /includes/search-shared/find-connection-string.rst

#. Create the index.

   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell
            
         go run create-index.go

      .. output::

         New search index named default is building.
