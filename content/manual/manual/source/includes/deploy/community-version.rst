
To confirm that the installation was successful, run ``mongod`` with the
:option:`--version <mongod --version>` option:

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

