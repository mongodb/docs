You can connect to your MongoDB deployment by providing a
**connection URI**, also called a *connection string*, which
tells {+odm+} how to connect to a MongoDB deployment and behave while
connected.

The connection string includes the hostname or IP address and
port of your deployment, the authentication mechanism, user credentials
when applicable, and connection options.

To learn about connecting to an instance or deployment not hosted on
Atlas, see :manual:`Connection Strings </reference/connection-string/>`
in the {+server-manual+}.

.. procedure::
   :style: connected

   .. step:: Find your MongoDB Atlas connection string

      To retrieve your connection string for the deployment that
      you created in the previous step, log in to your Atlas account.
      Then, navigate to the :guilabel:`Database` section and click the
      :guilabel:`Connect` button for your new deployment.

      .. figure:: /includes/figures/atlas_connection_select_cluster.png
         :alt: The connect button in the clusters section of the Atlas UI

      Proceed to the :guilabel:`Connect your application` section. Select
      **{+language+}** from the :guilabel:`Driver` selection menu and
      the most recent {+ruby-driver+} version from the
      :guilabel:`Version` selection menu.

      Deselect the :guilabel:`View full code sample` option to view only
      the connection string.

   .. step:: Copy your connection string

      Click the button on the right of the connection string to copy it
      to your clipboard.

   .. step:: Update the placeholders

      Paste the connection string into a file in your preferred text editor
      and replace the ``<username>`` and ``<password>`` placeholders with
      your database user's username and password.

      Save this file to a safe location for use in the next step.

After completing these steps, you have a connection string that
contains your database username and password.

.. include:: /includes/quick-start/troubleshoot.rst