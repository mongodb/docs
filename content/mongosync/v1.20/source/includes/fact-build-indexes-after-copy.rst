If the value of ``buildIndexes`` is |build-index-param| and you set :ref:`createSupportingIndexes
<mongosync-create-supporting-indexes-param>` to ``false`` while migrating
to a sharded cluster, ``mongosync`` creates a dummy index to support the shard key. 
``mongosync`` attempts to drop this dummy index after ``commit`` is called. 
If no user-built indexes exist to support the shard key, dropping the 
dummy index will fail. Users are advised to drop the dummy index and
create their own index after migration completes.