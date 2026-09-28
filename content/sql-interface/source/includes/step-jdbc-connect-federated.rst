.. step:: Connect to your {+fdi+}.

   To connect to your {+fdi+}, create a connection string and open a
   connection from your application. The connection string for the
   |jdbc| driver follows the format of the standard MongoDB connection
   |uri|, except with the ``jdbc:`` prefix: ``jdbc:<your_mongodb_uri>``.

   .. code-block::

      jdbc:mongodb://[username:password]@[host].a.query.mongodb.net/<databaseName>[?option1=value1[&option2=value2]...]

   To get the connection string from the {+atlas-ui+}, do the
   following:

   a. In the {+atlas-ui+}, go to the :guilabel:`Data Federation` page
      and click :guilabel:`Connect` for the {+fdi+} that you want to
      connect to.
   #. Under :guilabel:`Access your data through tools`, select
      :guilabel:`Atlas SQL`.
   #. Under :guilabel:`Select your driver`, select :guilabel:`JDBC
      Driver` from the dropdown.
   #. Under :guilabel:`Get Connection String`, select the database that
      you want to connect to and copy the connection string.
