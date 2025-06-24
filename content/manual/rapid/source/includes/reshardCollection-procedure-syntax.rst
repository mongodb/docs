.. code-block:: javascript

   db.adminCommand(
      {
        reshardCollection: "<database>.<collection>",
        key: { "<shardkey>" },
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
