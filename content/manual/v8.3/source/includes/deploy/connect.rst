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
              host: 'example',
              version: '{+release+}',
              process: 'mongod',
              pid: Long('71115'),
              uptime: 61,
              uptimeMillis: Long('61213'),
              uptimeEstimate: Long('61'),
              localTime: ISODate('2026-10-02T16:57:13.762Z'),
              ok: 1,
              '$clusterTime': {
                clusterTime: Timestamp({ t: 1790960233, i: 1 }),
                signature: {
                  hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
                  keyId: Long('0')
                }
              },
              operationTime: Timestamp({ t: 1790960233, i: 1 })
            }


