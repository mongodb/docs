Before you begin following this aggregation tutorial, you must set up a
new Go app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline.

.. tip::

   To learn how to install the driver and connect to MongoDB,
   see the :driver:`Go Driver Quick Start guide </go/current/quick-start/>`.

   To learn more about performing aggregations in the Go Driver, see the
   :driver:`Aggregation guide </go/current/fundamentals/aggregation/>`.

After you install the driver, create a file called
``agg_tutorial.go``. Paste the following code in this file to create an
app template for the aggregation tutorials.

.. important::

   In the following code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

.. literalinclude:: /code-examples/tested/go/driver/aggregation/pipelines/template_app.go
   :language: go
   :copyable: true
   :category: usage example

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string.

.. tip::

   To learn how to locate your deployment's connection string, see the
   :driver:`Create a MongoDB Cluster </go/current/quick-start/#create-a-mongodb-cluster>`
   step of the Go Quick Start guide.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: go
   :copyable: false

   const uri = "mongodb+srv://mongodb-example:27017";
