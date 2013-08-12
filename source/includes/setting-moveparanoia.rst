During chunk migrations, |move-paranoia-opt| forces the
:program:`mongod` instances to save all documents migrated from this
shard in the ``moveChunk`` directory of the :setting:`dbpath`. MongoDB
does not delete data from this directory.

Prior to 2.4, |move-paranoia-opt| was the default behavior of
MongoDB.
