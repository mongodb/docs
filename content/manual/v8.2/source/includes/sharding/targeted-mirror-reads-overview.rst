Starting in MongoDB 8.2, you can selectively mirror read operations 
to specific servers that need their caches warmed up by tagging the 
nodes for read mirroring. Unlike general mirrored reads, targeted read 
mirroring allows you to target hidden nodes and mirror from 
both primary and secondary nodes.

You can configure targeted mirrored reads using the ``targetedMirroring``
field in the :parameter:`mirrorReads` parameter. 