.. code-block:: javascript

   db.adminCommand(
      {
        reshardCollection: "<database>.<collection>",
        key: { "<shardkey>" },
        unique: <boolean>,
        numInitialChunks: <integer>,
        numSamplesPerChunk: <integer>,  // New in MongoDB 8.0.20
        collation: { locale: "simple" },
        zones: [
            {
                min: { "<document with same shape as shardkey>" },
                max: { "<document with same shape as shardkey>" },
                zone: <string> | null
            },
        ],
        forceRedistribution: <bool>
      }
   )
