To configure cluster nodes for `split horizon DNS 
<https://en.wikipedia.org/wiki/Split-horizon_DNS>`__, use host names
instead of IP addresses. 

Starting in MongoDB v5.0, :dbcommand:`replSetInitiate` and 
:dbcommand:`replSetReconfig` reject configurations that use IP
addresses instead of hostnames.

Use :parameter:`disableSplitHorizonIPCheck` to modify nodes that
cannot be updated to use host names. The parameter only applies to the
configuration commands. 

:binary:`mongod` and :binary:`mongos` do not rely on
:parameter:`disableSplitHorizonIPCheck` for validation at startup.
Legacy :binary:`mongod` and :binary:`mongos` instances that use IP
addresses instead of host names will start after an upgrade. 

Instances that are configured with IP addresses log a warning to use
host names instead of IP addresses. 

