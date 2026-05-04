When a role is dropped on a :program:`mongod`, previously authenticated users 
remain logged in to the database but immediately lose the role's privileges.

When a role is dropped on a :program:`mongos`, previously authenticated users 
remain logged in to the database but lose the role's privileges when the cache 
refreshes. The cache refreshes automatically after the time specified with the
:parameter:`userCacheInvalidationIntervalSecs` parameter or manually when 
you run the :dbcommand:`invalidateUserCache` command.
