.. step:: Connect to your {+cluster+}.

   To connect to your {+dedicated-cluster+}, create a connection
   string and open a connection from your application. The connection
   string for the |jdbc| driver follows the format of the standard
   MongoDB connection |uri|, except with the ``jdbc:`` prefix:
   ``jdbc:<your_mongodb_uri>``.

   .. code-block::

      jdbc:mongodb+srv://<cluster-host>/<databaseName>?ssl=true&authSource=admin

   To get the connection string from the {+atlas-ui+}, do the
   following:

   a. In the {+atlas-ui+}, go to the :guilabel:`Clusters` page and
      click :guilabel:`Connect` for the {+cluster+} that you want to
      connect to.
   #. Under :guilabel:`Access your data through tools`, select
      :guilabel:`Atlas SQL`.
   #. Under :guilabel:`Select your driver`, select :guilabel:`JDBC
      Driver` from the dropdown.
   #. Under :guilabel:`Get Connection String`, select the database that
      you want to connect to and copy the connection string.

   You must enable the {+sql-interface+} for the {+cluster+} before
   you can connect. To learn more, see :ref:`sql-connect`.
