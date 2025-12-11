Set up a Free Tier Cluster in Atlas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can create a free tier MongoDB deployment on MongoDB Atlas to store and
manage your data. MongoDB Altas hosts and manages your MongoDB database in the
cloud.

.. procedure::
   :style: connected

   .. step:: Create a free tier cluster.

      Complete the `MongoDB Get Started <https://www.mongodb.com/docs/get-started/?language=go>`__ guide to
      set up a new Atlas account, create a free tier MongoDB cluster, load
      datasets, and interact with the data.

   .. step:: Save your credentials.

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

   .. step:: Retrieve your MongoDB Atlas connection string.

      To retrieve your connection string for the deployment you created in the
      previous section, log in to your Atlas account and navigate to the
      :guilabel:`Clusters` page under the :guilabel:`Database` section. Click
      the :guilabel:`Connect` button for your new deployment.

      .. figure:: /includes/figures/atlas_connect_to_cluster.png 
         :alt: The connect button in the clusters section of the Atlas UI

      If you do not already have a database user configured, MongoDB will
      prompt you to create and configure a new user.

      Click the :guilabel:`Drivers` button under :guilabel:`Connect to your application` 
      and select "Go" from the :guilabel:`Driver` selection menu and the version
      that best matches the version you installed from the :guilabel:`Version` 
      selection menu.

      Ensure the :guilabel:`View full code sample` option is deselected to
      view only the connection string.

   .. step:: Copy your connection string.

      Click the button on the right of the connection string to copy it to your
      clipboard as shown in the following screenshot:

      .. figure:: /includes/figures/atlas_copy_connection_string_go.png 
         :alt: The connection string copy button in the Atlas UI

   .. step:: Update the password placeholder.

      Paste this connection string into a file in your preferred text editor
      and replace the ``<db_password>`` placeholder with your database user's
      password. The connection string is already populated with your database
      user's username.
      
      Save this file to a safe location for use in the next step.

After completing these steps, you have a connection string that corresponds your
Atlas cluster.

To learn more about connecting to Atlas by using the {+driver-long+} and applying
connection options, see the :atlas:`Atlas driver connection guide </driver-connection>`.
