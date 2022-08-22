Set up a Free Tier Cluster in Atlas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After setting up your .NET project dependencies, create a MongoDB cluster
where you can store and manage your data. Complete the
:atlas:`Get Started with Atlas </getting-started>` guide to set up a new
Atlas account and free tier MongoDB cluster, load datasets, and
interact with the data.

After completing the steps in the Atlas guide, you should have a new MongoDB
cluster deployed in Atlas, a new database user, and
:atlas:`sample datasets loaded </sample-data/>` into your cluster.

.. _csharp-connect-to-your-cluster:

Connect to Your Cluster
-----------------------

In this step, you'll create and run an application that uses the {+driver-short+} to connect to your MongoDB cluster and run a query on the sample data.

You pass instructions to the driver on where and how to connect to your
MongoDB cluster in a string called the *connection string*. This string
includes information on the hostname or IP address and port of your
cluster, authentication mechanism, user credentials (when applicable), and
other connection options.

To retrieve your connection string for the cluster and user you created in
the previous step, log into your Atlas account and navigate to the
**Clusters** section, then click the **Connect** button for the cluster that you
want to connect to, as shown below.

.. figure:: /includes/figures/atlas_connection_select_cluster.png
   :alt: Atlas Connection GUI cluster selection screen

Proceed to the **Connect Your Application** step and select the {+driver-short+}. Then, click the **Copy** button to copy the *connection string*
to your clipboard as shown below.

.. figure:: /includes/figures/atlas_connection_copy_string.png
   :alt: Atlas Connection GUI connection string screen

Save your Atlas connection string in a safe location that you can access
for the next step.

To learn more about connecting to the {+driver-short+} through Atlas, see
the :atlas:`Atlas driver connection guide </driver-connection>`
and select **C#** from the *Select your language* dropdown.
