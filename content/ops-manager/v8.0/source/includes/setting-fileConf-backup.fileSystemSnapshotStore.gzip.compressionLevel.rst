.. setting:: backup.fileSystemSnapshotStore.gzip.compressionLevel

   *Type*: integer

   *Default*: 6

   
   Determines how much |onprem| compresses file system-based snapshots.
   The level ranges from ``0`` to ``9``:
   
   - ``0`` provides no compression.
   
   - ``1`` to ``9`` increases the degree of compression at a cost of
     how fast the snapshot is compressed. Level ``1`` compresses
     snapshots the least but at the fastest speed. Level ``9``
     compresses snapshots the most but at the slowest speed.
   
   .. note::
   
      Changing :guilabel:`File System Store Gzip Compression Level`
      affects new snapshots only. It does not affect the compression
      level of existing snapshots.
   
   Corresponds to :setting:`File System Store Gzip Compression Level`.
   

