.. warning::

   Be careful when splitting chunks. When you shard a collection that
   has existing data, MongoDB automatically creates chunks to evenly
   spread the collection. Performing additional splits requires
   knowledge of the resulting chunk sizes by numbers of documents and by
   size. You do not want splits that cause some chunks to be much larger
   than others. This leads to balancing based on count of chunks, not on
   their size, which may cause extreme load/data-distribution problems.
