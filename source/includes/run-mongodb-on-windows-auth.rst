To restart MongoDB, run :binary:`~bin.mongod.exe` with the
:option:`--auth <mongod.--auth>` option. 

.. code-block:: bat

   "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath "d:\test\mongo db data" --auth

This starts the main MongoDB database process. The ``waiting for
connections`` message in the console output indicates that the
:binary:`~bin.mongod.exe` process is running successfully.