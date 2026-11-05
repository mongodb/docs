.. MongoDB Community/Enterprise procedure to start and verify mongod
.. for tar installations.

.. procedure::
   :style: normal

   .. step:: Verify the installation.

      To confirm that the installation was successful, run ``mongod``
      with the :option:`--version <mongod --version>` option:

      .. io-code-block::

         .. input::
            :language: bash

            mongod --version

         .. output::
            :language: bash

            db version {+release+}
            Build Info: {
                "version": "{+release+}",
                "gitVersion": "<git-hash>",
                "modules": [
                    "community"
                ],
                "allocator": "system",
                "javascriptEngine": "mozjs-wasm",
                "environment": {
                    "distarch": "x86_64",
                    "target_arch": "x86_64"
                }
            }

   .. step:: Start MongoDB |edition|.

      .. tabs::

         .. tab:: Configuration
            :tabid: config

            To start the :binary:`~bin.mongod` process from a
            configuration file, run the following command:

            .. code-block:: bash

               mongod --config /path/to/mongod.conf --fork

         .. tab:: Options
            :tabid: opts

            To start the :binary:`~bin.mongod` process, run the
            following command:

            .. code-block:: bash

               mongod --dbpath /path/to/dataDir --logpath /path/to/logs --fork

