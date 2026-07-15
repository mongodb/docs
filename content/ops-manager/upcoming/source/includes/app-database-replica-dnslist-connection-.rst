If you use a :term:`replica set`
for the database's :doc:`backing instance </tutorial/prepare-backing-mongodb-instances>`,
your connection string that includes the hostname for the |dns| seedlist, include the
|dns-srv| record that describes your database's backing instance
replica set. The connection string uses the **mongodb+srv:**
protocol, not the **mongodb:** protocol.

This option requires a |dns-srv| record for the application database.
The |dns| entry uses the DNS seedlist string format. Make sure
|onprem| can connect to this application database.

.. seealso::

         :ref:`DNS Seedlist Connection Format <dns-seed-list-connection-format>`