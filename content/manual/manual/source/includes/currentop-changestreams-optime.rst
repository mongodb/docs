For a change stream cursor, the operation time of the cursor's current
position in the oplog. The value is the timestamp of the most recent
oplog entry that the cursor read, including entries that don't produce
a change event. The value can therefore be ahead of the most recent
event that the cursor returned.

The value updates once per :dbcommand:`getMore` command, so progress
that a cursor makes during a ``getMore`` operation isn't visible until
the operation returns.

To estimate how far a change stream lags behind the writes on the
server, compare this value to the most recent entry in the oplog.

The field appears only for change stream cursors.

.. versionadded:: 9.0
