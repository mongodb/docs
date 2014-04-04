As of these :ref:`driver versions <write-concern-change-releases>`,
MongoDB will acknowledge all write operations. By default drivers
issue a :dbcommand:`getLastError` command to confirm that the database
has received the write operation:

.. code-block:: javascript

   { getLastError: 1 }

See :doc:`/core/write-concern` for more information.
