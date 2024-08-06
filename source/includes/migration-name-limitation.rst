The ``migrationName`` string can contain up to 44 alphanumeric and underscore 
characters. ``migrationName`` is appended to the string 
``"mongosync_internal_"`` to set the migration metadata database name.

For example, if you set ``migrationName`` to 
``"cluster_27000_to_cluster_35000_sync"``, the resulting ``mongosync`` metadata 
database name is ``"mongosync_internal_cluster_27000_to_cluster_35000_sync"``.