Set up a Free Tier Cluster in Atlas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After setting up your Java project dependencies, create a MongoDB cluster
where you can store and manage your data. Complete the
:atlas:`Get Started with Atlas </getting-started?jmp=docs_driver_java>` guide
to set up a new Atlas account, create and launch a free tier MongoDB cluster,
load datasets, and interact with the data.

After completing the steps in the Atlas guide, you should have a new MongoDB
cluster deployed in Atlas, a new database user, and sample datasets loaded
into your cluster.

Connect to your Cluster
-----------------------

In this step, we create and run an application that uses the MongoDB Java
driver to connect to your MongoDB cluster and run a query on the sample
data.

We pass instructions to the driver on how to connect to your
MongoDB cluster in a string called the *connection string*. This string
includes information on the hostname or IP address and port of your
cluster, authentication mechanism, user credentials when applicable, and
other connection options.

If you are connecting to an instance or cluster that is not hosted by Atlas,
see :ref:`Other Ways to Connect to MongoDB <java-other-ways-to-connect>` for
instructions on how to format your connection string.

To retrieve your connection string for the cluster and user you created in
the previous step, log into your Atlas account and navigate to the
:guilabel:`Database` section and click the :guilabel:`Connect` button for the cluster that you
want to connect to as shown below.

.. figure:: /includes/figures/atlas_connection_select_cluster.png
   :alt: Atlas Connection GUI cluster selection screen

Proceed to the :guilabel:`Connect Your Application` step and select the Java driver.
Select "4.1 or Later" for the version.
Click the :guilabel:`Copy` icon to copy the *connection string* to your clipboard as
shown below.

.. figure:: /includes/figures/atlas_connection_copy_string_java.png
   :alt: Atlas Connection GUI connection string screen

Save your Atlas connection string in a safe location that you can access
for the next step.
