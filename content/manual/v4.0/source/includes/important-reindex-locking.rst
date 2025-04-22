.. important:: |cmd-name| always builds indexes in the foreground
   due to the logic described in :ref:`createIndexes-multiple-indexes`.

   Starting in MongoDB 4.0, |cmd-name| takes a :serverstatus:`global
   exclusive (W) lock <locks>` and will block other operations until it
   finishes.
