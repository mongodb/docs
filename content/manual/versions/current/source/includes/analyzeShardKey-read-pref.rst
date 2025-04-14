To minimize the performance, run |analyzeShardKey| with the 
:readmode:`secondary` or :readmode:`secondaryPreferred` read preference. 
On a sharded cluster, ``mongos`` automatically sets the read preference 
to ``secondaryPreferred`` if not specified.
