If :dbcommand:`find` (or subsequent :dbcommand:`getMore` commands)
returns partial results because the queried shard(s) aren't available,
the :ref:`find output <cmd-find-output>` includes a
``partialResultsReturned`` indicator field. If the queried shards are
available for the initial ``find`` command, but one or more shards
become unavailable for subsequent ``getMore`` commands, only the
``getMore`` commands that run while the shards aren't available include
``partialResultsReturned`` in their output.