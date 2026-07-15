If you use a :term:`sharded cluster` 
for the database's :doc:`backing instance </tutorial/prepare-backing-mongodb-instances>`,
your connection string that includes the hostname for the |dns| seedlist,include the
|dns-srv| record that describes your database's backing instance
sharded cluster. The connection string uses the **mongodb+srv:**
protocol, not the **mongodb:** protocol.

This option requires a |dns-srv| record for the application
database. The |dns| entry uses the |dns| seedlist string format.
Make sure |mms| can connect to this application database.

.. seealso::

    :ref:`DNS Seedlist Connection Format <dns-seed-list-connection-format>`

