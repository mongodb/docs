Max Staleness Seconds represents the longest replication lag, in wall-clock time, 
that a secondary can experience and still be eligible for server selection. The 
smallest allowed value for ``maxStalenessSeconds`` is 90 seconds. This option
must be used with a non-primary read preference. 