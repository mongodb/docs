Before you begin following an aggregation tutorial, you must set up a
new Python app. You can use this app to connect to a MongoDB
deployment, insert sample data into MongoDB, and run the aggregation
pipeline in each tutorial.

.. tip:: 
   
   To learn how to install the driver and connect to MongoDB,
   see :ref:`pymongo-get-started`

Once you install the driver, create a file called
``agg_tutorial.py``. Paste the following code in this file to create an
app template for the aggregation tutorials:

.. literalinclude:: /includes/aggregation/template-app.py
   :language: python
   :copyable: true

.. important::

   In the preceding code, read the code comments to find the sections of
   the code that you must modify for the tutorial you are following.

   If you attempt to run the code without making any changes, you will
   encounter a connection error.

For every tutorial, you must replace the connection string placeholder with
your deployment's connection string. To learn how to locate your deployment's connection
string, see :ref:`pymongo-get-started-connection-string`.

For example, if your connection string is
``"mongodb+srv://mongodb-example:27017"``, your connection string assignment resembles
the following:

.. code-block:: python
   :copyable: false

   uri = "mongodb+srv://mongodb-example:27017";

To run the completed file after you modify the template for a
tutorial, run the following command in your shell:

.. code-block:: bash

   python3 agg_tutorial.py