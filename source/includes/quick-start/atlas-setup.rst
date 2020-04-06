Set up a Free Tier Cluster in Atlas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After setting up your Java project dependencies, create a MongoDB instance
where you can store and manage your data. Complete the
:atlas:`Get Started with Atlas <getting-started>` guide to set up a new
Atlas account, free tier cluster (MongoDB instance), load datasets, and
interact with the data.

After completing the steps in the Atlas guide, you should have a new MongoDB
cluster deployed in Atlas, a new database user, and sample datasets loaded
into your cluster.

Connect to your Cluster
-----------------------

In this step, we create and run an application that uses the Java MongoDB
driver to connect to your instance of MongoDB and run a query on the sample
data.

We pass instructions to the driver on where and how to connect to your
MongoDB instance in a string called the *connection string*. This string
includes information on the hostname or IP address and port of your
instance, authentication mechanism, user credentials when applicable, and
other connection options.

To retrieve your connection string for the instance and user you created in
the previous step, log into your Atlas account and navigate to the
**Clusters** section and click the **Connect** button for the cluster that you
want to connect to as shown below.

.. figure:: /includes/figures/atlas_connection_select_cluster.png

Proceed to the **Connect Your Application** step and select the Java driver.
Then, select the "Connection String Only" tab and click the **Copy**
button to copy the *connection string* to your clipboard as shown below.

.. figure:: /includes/figures/atlas_connection_copy_string.png

Save your Atlas connection string in a safe location that you can access
for the next step.
