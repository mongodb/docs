The following example demonstrates how to open a connection.
In addition to the connection string, you must also specify
the database to use through a ``Properties`` object parameter.
To learn more, see :manual:`Connection Strings
</reference/connection-string/#std-label-connections-connection-options>`
and :github:`Connection Properties </mongodb/mongo-jdbc-driver#connection-properties>`.

.. code-block:: java

   java.util.Properties p = new java.util.Properties();
   p.setProperty("database", "<databaseName>");
   p.setProperty("loglevel", "debug");
   p.setProperty("logdir", "your/path");
   Connection conn = DriverManager.getConnection("<connectionString>", p);

.. note::

   Any special characters in the connection string for the
   |jdbc| driver must be URL encoded.
