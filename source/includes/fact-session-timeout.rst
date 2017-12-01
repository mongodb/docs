The time in minutes that a :ref:`session <sessions>` remains active
after its most recent use. Sessions that have not received a new
read/write operation from the client or been refreshed with
:dbcommand:`refreshSessions` within this threshold are cleared from the
cache. State associated with an expired session may be cleaned up by the
server at any time.