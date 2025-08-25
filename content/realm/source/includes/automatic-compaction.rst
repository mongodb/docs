The SDK automatically compacts Realm files in the background by continuously reallocating data 
within the file and removing unused file space. Automatic compaction is sufficient for minimizing the Realm file size 
for most applications. 

Automatic compaction begins when the size of unused space in the file is more than twice the size of user 
data in the file. Automatic compaction only takes place when
the file is not being accessed.