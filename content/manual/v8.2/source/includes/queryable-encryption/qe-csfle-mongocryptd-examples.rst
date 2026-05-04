To view examples of how to configure your ``mongocryptd`` 
process, click the tab corresponding to the driver you are using in 
your application:

.. tabs-selector:: drivers

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      The following code-snippet sets the listening port configuration
      of ``mongocryptd``:

      .. code-block:: java

          List<String> spawnArgs = new ArrayList<String>();
          spawnArgs.add("--port=30000");

          Map<String, Object> extraOpts = new HashMap<String, Object>();
          extraOpts.put("mongocryptdSpawnArgs", spawnArgs);

          AutoEncryptionSettings autoEncryptionSettings = AutoEncryptionSettings.builder()
              ...
              .extraOptions(extraOpts);

      The following code-snippet sets the default timeout configuration
      of ``mongocryptd``:

      .. code-block:: java

          List<String> spawnArgs = new ArrayList<String>();
          spawnArgs.add("--idleShutdownTimeoutSecs")
              .add("60");

          Map<String, Object> extraOpts = new HashMap<String, Object>();
          extraOpts.put("mongocryptdSpawnArgs", spawnArgs);

          AutoEncryptionSettings autoEncryptionSettings = AutoEncryptionSettings.builder()
              ...
              .extraOptions(extraOpts);

   .. tab::
      :tabid: nodejs

      The following code-snippet sets the listening port configuration
      of ``mongocryptd``:

      .. code-block:: javascript

          autoEncryption: {
            ...
            extraOptions: {
              mongocryptdSpawnArgs: ["--port", "30000"],
              mongocryptdURI: 'mongodb://localhost:30000',
            }
      
      .. note::

        In the NodeJS driver, the ``mongocryptdURI`` must match the listening port.

      The following code-snippet sets the default timeout configuration
      of ``mongocryptd``:

      .. code-block:: javascript

        autoEncryption: {
          ...
          extraOptions: {
            mongocryptdSpawnArgs: ["--idleShutdownTimeoutSecs", "75"]
          }

   .. tab::
      :tabid: python

      The following code-snippet sets the listening port configuration
      of ``mongocryptd``:

      .. code-block:: python

          auto_encryption_opts = AutoEncryptionOpts(mongocryptd_spawn_args=['--port=30000'])

      The following code-snippet sets the default timeout configuration
      of ``mongocryptd``:

      .. code-block:: python

          auto_encryption_opts = AutoEncryptionOpts(mongocryptd_spawn_args=['--idleShutdownTimeoutSecs=75'])

   .. tab::
      :tabid: csharp

      The following code-snippet sets the listening port configuration
      of ``mongocryptd``:

      .. code-block:: csharp

          var extraOptions = new Dictionary<string, object>()
          {
              { "mongocryptdSpawnArgs", new [] { "--port=30000" } },
          };
          autoEncryptionOptions.With(extraOptions: extraOptions);

      The following code-snippet sets the default timeout configuration
      of ``mongocryptd``:

      .. code-block:: csharp

          var extraOptions = new Dictionary<string, object>()
          {
              { "idleShutdownTimeoutSecs", 60 },
          };
          autoEncryptionOptions.With(extraOptions: extraOptions);

   .. tab::
      :tabid: go

      The following code-snippet sets the listening port configuration
      of ``mongocryptd``:

      .. code-block:: go

          extraOptions := map[string]interface{}{
              "mongocryptdSpawnArgs": []string{
                  "--port=30000",
              },
          }

      The following code-snippet sets the default timeout configuration
      of ``mongocryptd``:

      .. code-block:: go

          extraOptions := map[string]interface{}{
              "mongocryptdSpawnArgs": []string{
                  "--idleShutdownTimeoutSecs=75",
              },
          }
          