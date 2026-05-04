Starting in MongoDB 5.1, invalid :query:`$regex options <$regex>` 
options are no longer ignored. This change makes 
:query:`$regex options <$regex>` more consistent with 
the use of ``$regex`` in the :dbcommand:`aggregate` command and
:ref:`projection <projection>` queries.