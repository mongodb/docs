The ``{ cursor: { batchSize: 0 } }`` document specifies the size of the
*initial* batch size and indicates an empty first batch. This quickly
returns a cursor or failure message without doing significant
server-side work.

To specify batch size for subsequent :dbcommand:`getMore` operations,
use :method:`~cursor.batchSize()` in mongosh or the ``batchSize``
field in the :dbcommand:`getMore` command.

