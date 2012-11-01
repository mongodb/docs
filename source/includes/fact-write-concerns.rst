By default, all write operations will issue a :dbcommand:`getLastError`
command to confirm the result of the write operation:
   
.. code-block:: javascript

   { getLastError: 1 }

.. todo When draft/core/write-operations.txt goes live, change this below:
   write-concern
   to
   write-operations-write-concern

Refer to the documentation on :ref:`write concern <write-concern>` and
:doc:`/applications/write-operations` for more information.
