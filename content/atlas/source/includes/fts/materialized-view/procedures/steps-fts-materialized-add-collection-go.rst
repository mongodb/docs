.. procedure::
   :style: normal

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-materialized-view`` and initialize your project in that directory: 
      
      .. code-block:: shell
         :copyable: true

         mkdir search-materialized-view
         cd search-materialized-view
         go mod init search-materialized-view
         go get go.mongodb.org/mongo-driver/v2/mongo

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Define the ``purchaseOrders`` collection documents.
      
      Create a ``create-collection.go`` file in your project directory, 
      and copy and paste the following code into the file. This code
      performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.

      .. literalinclude:: /includes/fts/materialized-view/create-collection.go
         :caption: create-collection.go
         :language: go
         :linenos:
         :copyable:

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Populate the ``purchaseOrders`` collection and display its documents.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create-collection.go

         .. output::
            :visible: false

            Successfully inserted purchase order documents.
            
            Query results:
            map[_id:ObjectId("...") couponUsed:false customer:map[age:50 email:keecade@hem.uy gender:M satisfaction:5] items:[map[quantity:10] map[quantity:9] map[quantity:3] map[quantity:4] map[quantity:4] map[quantity:1] map[quantity:2] map[quantity:4]] purchaseMethod:Phone saleDate:2018-01-25 10:01:02.918 +0000 UTC storeLocation:Seattle]
            map[_id:ObjectId("...") couponUsed:true customer:map[age:42 email:cauho@witwuta.sv gender:M satisfaction:4] items:[map[quantity:2] map[quantity:2] map[quantity:5] map[quantity:2] map[quantity:2] map[quantity:8] map[quantity:3]] purchaseMethod:Phone saleDate:2018-01-23 21:06:49.506 +0000 UTC storeLocation:Denver]
