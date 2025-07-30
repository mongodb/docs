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
      previous section, log in to your Atlas account. Navigate to the
      :guilabel:`Database` section and click :guilabel:`Clusters`. Click the
      :guilabel:`Connect` button for the cluster that you want to connect to as
      shown below:

      .. figure:: /includes/figures/atlas_connection_select_cluster.png
         :alt: Atlas Connection GUI cluster selection screen

      Then, select the :guilabel:`Drivers` option under the :guilabel:`Connect
      to your application` header. Select "Go" from the :guilabel:`Driver`
      selection menu and the version that best matches the version you installed
      from the :guilabel:`Version` selection menu.

   .. step:: Copy your connection string

      Click the button to the right of the connection string to copy it to your
      clipboard, as shown in the following screenshot:

      .. figure:: /includes/figures/atlas_connection_copy_string_go.png
         :alt: Atlas Connection GUI connection string screen

   .. step:: Update the placeholders

      Paste this connection string into a file in your preferred text editor
      and replace the ``<db_username>`` and ``<db_password>`` placeholders with
      your database user's username and password.
      
      Save this file to a safe location for use in the next step.

After completing these steps, you have a connection string that corresponds your
Atlas cluster.

To learn more about connecting to the {+driver-long+} through Atlas, see
the :atlas:`Atlas driver connection guide </driver-connection>`
and select **Go** from the :guilabel:`Select your language` dropdown.
