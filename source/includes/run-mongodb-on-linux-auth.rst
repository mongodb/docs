To restart MongoDB with access control, run the :binary:`~bin.mongod`
process from your terminal with the :option:`--auth <mongod.--auth>`
option. The :binary:`~bin.mongod` process is located in a ``bin``
folder in the MongoDB installation directory.

.. code-block:: sh

   mongod --dbpath <path to data directory> --auth

If you used the default data directory for your MongoDB deployment,
(i.e., ``/data/db``), you can leave off the 
:option:`--dbpath <mongod.--dbpath>` option.

If your :binary:`~bin.mongod` instance has successfully started, you
will see logging output in your terminal that includes
``[initandlisten] waiting for connections``.