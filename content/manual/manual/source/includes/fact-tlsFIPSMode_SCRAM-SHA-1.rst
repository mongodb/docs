Starting in MongoDB 8.3, you cannot specify ``SCRAM-SHA-1`` for 
:parameter:`authenticationMechanisms` while also specifying 
:option:`mongod --tlsFIPSMode` or :option:`mongos --tlsFIPSMode`.

If you try to specify ``SCRAM-SHA-1`` for ``authenticationMechanisms`` while 
also specifying ``--tlsFIPSMode``, the server throws an error and 
logs a message similar to the following:

.. code-block:: none

   SCRAM-SHA-1 is not allowed in FIPS mode.