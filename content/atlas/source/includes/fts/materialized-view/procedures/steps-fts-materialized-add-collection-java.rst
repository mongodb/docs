.. procedure::
   :style: normal

   .. step:: Set up your Java project with the MongoDB Java driver.

      .. include:: /includes/fts/field-types/add-java-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation </java/sync/current/get-started/>`.

   .. step:: Define the ``purchaseOrders`` collection documents.

      In your project's base package directory, create a 
      ``CreateCollection.java`` file and copy and paste the following code 
      into this file. This code performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.

      .. literalinclude:: /includes/fts/materialized-view/CreateCollection.java
         :language: java
         :caption: CreateCollection.java
         :linenos:
         :copyable: true

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Compile and run the file to populate the collection and display its documents.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateCollection.java
            java CreateCollection

         .. output::
            :visible: false

            Successfully inserted purchase order documents.
            
            Query results:
            Document{{_id=ObjectId(...), saleDate=Sun Jan 25 10:01:02 UTC 2018, items=[...], storeLocation=Seattle, customer=Document{{gender=M, age=50, email=keecade@hem.uy, satisfaction=5}}, couponUsed=false, purchaseMethod=Phone}}
            Document{{_id=ObjectId(...), saleDate=Tue Jan 23 21:06:49 UTC 2018, items=[...], storeLocation=Denver, customer=Document{{gender=M, age=42, email=cauho@witwuta.sv, satisfaction=4}}, couponUsed=true, purchaseMethod=Phone}}
