Starting in MongoDB 7.3, when you use a find command on a view 
with the ``singleBatch: true`` and ``batchSize: 1`` options, a cursor 
is no longer returned. In previous versions of MongoDB these find queries 
would return a cursor even when you set the :ref:`single batch<find-single-batch>` 
option to ``true``.