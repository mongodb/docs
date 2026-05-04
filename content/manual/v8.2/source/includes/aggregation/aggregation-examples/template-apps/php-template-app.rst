Before you begin following this aggregation tutorial, you must set up a
new PHP app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip::

   To learn how to install the PHP library and connect to MongoDB,
   see the `Get Started with the PHP Library
   <https://www.mongodb.com/docs/php-library/current/get-started/>`__
   tutorial.

   To learn more about performing aggregations in the PHP library, see the
   `Aggregation guide
   <https://www.mongodb.com/docs/php-library/current/aggregation/>`__.

After you install the library, create a file called
``agg_tutorial.php``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. code-block:: php

   <?php
   
   require 'vendor/autoload.php';
   
   // Modify imports for each tutorial as needed.
   use MongoDB\Client;
   use MongoDB\BSON\UTCDateTime;
   use MongoDB\Builder\Pipeline;
   use MongoDB\Builder\Stage;
   use MongoDB\Builder\Type\Sort;
   use MongoDB\Builder\Query;
   use MongoDB\Builder\Expression;
   use MongoDB\Builder\Accumulator;
   
   use function MongoDB\object;
   
   // Replace the placeholder with your connection string.
   $uri = '<connection string>';
   $client = new Client($uri);
   
   // Get a reference to relevant collections.
   // ... $someColl = $client->agg_tutorials_db->someColl;
   // ... $anotherColl = $client->agg_tutorials_db->anotherColl;
   
   // Delete any existing documents in collections if needed.
   // ... $someColl->deleteMany([]);

   // Insert sample data into the collection or collections.
   // ... $someColl->insertMany(...);
   
   // Add code to create pipeline stages within the Pipeline instance.
   // ... $pipeline = new Pipeline(...);
   
   // Run the aggregation.
   // ... $cursor = $someColl->aggregate($pipeline);
   
   // Print the aggregation results.
   foreach ($cursor as $doc) {
       echo json_encode($doc, JSON_PRETTY_PRINT), PHP_EOL;
   }

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   `Create a Connection String <https://www.mongodb.com/docs/php-library/current/get-started/#create-a-connection-string>`__
   step of the Get Started with the PHP Library tutorial.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: php
   :copyable: false

   $uri = 'mongodb+srv://mongodb-example:27017';
