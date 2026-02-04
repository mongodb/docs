Before you can authenticate and run the example scripts using
the Atlas Go SDK, you must:

- :ref:`Create an Atlas service account <service-accounts-overview>`.
  Store your client ID and secret as environment variables by
  running the following command in the terminal:

  .. code-block:: shell

     export MONGODB_ATLAS_SERVICE_ACCOUNT_ID="<insert your client ID here>"
     export MONGODB_ATLAS_SERVICE_ACCOUNT_SECRET="<insert your client secret here>"

- Set the following configuration variables in your Go project:

  .. literalinclude:: examples/go-sdk/snippet.config.json
     :language: json
     :caption: configs/config.json
     :category: example configuration object