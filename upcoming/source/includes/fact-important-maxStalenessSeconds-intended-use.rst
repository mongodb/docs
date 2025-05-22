.. important:: 
   The ``maxStalenessSeconds`` read preference option is intended for
   applications that read from secondaries and want to avoid reading
   from a secondary that has fallen overly far behind in replicating
   the primary's writes. For example, a secondary might stop
   replicating due to a network outage between itself and the primary.
   In that case, the client should stop reading from the secondary
   until an administrator resolves the outage and the secondary catches
   up.
