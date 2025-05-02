Set up a Free Tier Cluster in Atlas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can create a free tier MongoDB deployment on MongoDB Atlas to store and
manage your data. MongoDB Altas hosts and manages your MongoDB database in the
cloud.

.. procedure::
   :style: connected

   .. step:: Create a free tier cluster

      Complete the :atlas:`Get Started with Atlas </getting-started>` guide to
      set up a new Atlas account, create a free tier MongoDB cluster, load
      datasets, and interact with the data.

   .. step:: Save your credentials

      After you create your database user, save that user's username and
      password to a safe location for use in an upcoming step.

After completing these steps, you have a new MongoDB cluster deployed in
Atlas, a new database user, and :atlas:`sample datasets loaded </sample-data/>`
into your cluster.

.. _golang-connect-to-your-cluster:

Connect to Your Cluster
~~~~~~~~~~~~~~~~~~~~~~~

You can connect to your MongoDB deployment by providing a
**connection URI**, also called a *connection string*, which
instructs the driver on how to connect to a MongoDB deployment
and how to behave while connected.

The connection string includes the hostname or IP address and 
port of your deployment, the authentication mechanism, user credentials 
when applicable, and connection options.

.. procedure::
   :style: connected

   .. step:: Retrieve your MongoDB Atlas connection string

      To retrieve your connection string for the cluster you created in the
      previous section, do the following:
      
      1. Log in to your Atlas account. 
      2. Navigate to the :guilabel:`Database` section on the sidebar and select :guilabel:`Clusters`. 
      3. Find the cluster you would like to connect to and click the :guilabel:`Connect` button.
      4. Under :guilable:`Connect to your application`, click the :guilabel:`Drivers` option. 
      5. Select "Go" from the :guilabel:`Driver` selection menu and the appropriate version from the :guilabel:`Version` selection menu.
      6. Copy the connection string clipboard, as shown in the following screenshot:

   .. step:: Update the placeholders

      Paste this connection string into a file in your preferred text editor
      and replace the ``<db_username>`` and ``<db_password>`` placeholders with
      your database user's username and password.
      
      Save this file to a safe location for use in the next step.

After completing these steps, you have a connection string that corresponds your
Atlas cluster.

To learn more about connecting to Atlas through the {+driver-long+} and applying
connection options, see the :atlas:`Atlas driver connection guide </driver-connection>`.
