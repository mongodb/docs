Over time, the storage space used by Realm might become fragmented 
and take up more space than necessary. To rearrange the internal storage and 
potentially reduce the file size, the realm file needs to be compacted.

Realm's default behavior is to automatically compact a realm file 
to prevent it from growing too large. You can use manual compaction strategies when 
automatic compaction is not sufficient for your use case.
