.. warning::

   When :pipeline:`$merge` outputs to the same collection that is being
   aggregated, documents may get updated multiple times or the operation
   may result in an infinite loop. This behavior occurs when the update
   performed by :pipeline:`$merge` changes the physical location of
   documents stored on disk. When the physical location of a document
   changes, :pipeline:`$merge` may view it as an entirely new document,
   resulting in additional updates. For more information on this
   behavior, see `Halloween Problem
   <https://en.wikipedia.org/w/index.php?title=Halloween_Problem&oldid=738886300>`__.
