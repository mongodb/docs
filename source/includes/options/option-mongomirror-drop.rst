.. option:: --drop

   Flag that indicates that :program:`mongomirror` should drop all user 
   collections (viewable in each database with 
   :authaction:`listCollections`) on the target {+cluster+}. This 
   option doesn't drop internal collections like ``local.system*`` and 
   the :term:`oplog`.
