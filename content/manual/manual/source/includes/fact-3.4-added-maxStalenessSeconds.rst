MongoDB supports the :doc:`maxStalenessSeconds 
</core/read-preference-staleness>` read preference option. The 
``maxStalenessSeconds`` option lets you specify a maximum replication
lag, or "staleness", that :term:`secondaries <secondary>` can have and
still be eligible for read operations. When a secondary's estimated
staleness exceeds ``maxStalenessSeconds``, the secondary becomes
ineligible for read operations.
