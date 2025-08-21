.. procedure::
   :style: normal

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-with-unionwith`` and initialize your project in that directory: 
      
      .. code-block:: shell
         :copyable: true

         mkdir search-with-unionwith
         cd search-with-unionwith
         go mod init search-with-unionwith
         go get go.mongodb.org/mongo-driver/v2

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Define the index.
      
      Create a ``create_indexes.go`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/search-with-unionwith/create-index-example.go
         :caption: create_indexes.go
         :language: go
         :linenos:
         :copyable:

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create_indexes.go

         .. output::
            :visible: false

            Index created on companies collection: default
            Index created on inspections collection: default
