As of these :ref:`driver versions <write-concern-change-releases>`, all
write operations will issue a :dbcommand:`getLastError` command to
confirm the result of the write operation:
   
.. code-block:: javascript

   { getLastError: 1 }

Refer to the documentation on :ref:`write concern <write-concern>` and
:doc:`/core/write-operations` for more information.
