.. Procedure used by MongoDB Community/Enterprise to connect to a newly
   installed instance and run serverStatus to check mongod health.

.. procedure::
   :style: normal

   .. step:: Connect to MongoDB |edition|.

      To connect to your deployment, run ``mongosh``:

      .. code-block:: sh

         mongosh

      The command connects to MongoDB |edition| through the default
      address: ``mongodb://localhost:27017``.

   .. step:: Check Server Status.

      To check the status of MongoDB, run the :dbcommand:`serverStatus`
      command:

      .. io-code-block::

         .. input::
            :language: javascript

            db.runCommand( { serverStatus: 1, none: 1, mem: 1 } )

         .. output::
            :language: javascript

            {
              host: '<hostname>',
              version: '{+release+}',
              process: 'mongod',
              pid: Long('71115'),
              uptime: 61,
              uptimeMillis: Long('61213'),
              uptimeEstimate: Long('61'),
              localTime: {+isodate+},
              ok: 1,
              '$clusterTime': {
                clusterTime: {+timestamp+},
                signature: {
                  hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
                  keyId: Long('0')
                }
              },
              operationTime: {+timestamp+}
            }


