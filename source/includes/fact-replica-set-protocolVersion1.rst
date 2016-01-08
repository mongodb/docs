.. versionadded:: 3.2

   MongoDB introduces a version 1 of the replication protocol
   (:rsconf:`protocolVersion: 1 <protocolVersion>`) to reduce replica
   set failover time and accelerates the detection of multiple
   simultaneous primaries. New replica sets will, by default, use
   :rsconf:`protocolVersion: 1 <protocolVersion>`. Previous versions of
   MongoDB use version 0 of the protocol.
