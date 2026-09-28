.. step:: Connect to your deployment.

   To connect to your self-managed deployment, create a connection
   string and open a connection from your application. The connection
   string for the |jdbc| driver follows the format of the standard
   MongoDB connection |uri|, except with the ``jdbc:`` prefix:
   ``jdbc:<your_mongodb_uri>``.

   .. code-block::

      jdbc:mongodb://[username:password@]<host>[:port][/databaseName][?option1=value1[&option2=value2]...]
