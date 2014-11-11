When you drop a role, users authenticated with the role lose the role's
privileges but remain logged in. They continue to have privileges from other
roles.

If a user is authenticated with the role on a :program:`mongod`, the
user loses the role's privileges immediately. 

If the user is authenticated on a :program:`mongos`, on the
:program:`mongos` used to make the change, the user loses the access
immediately. If there are other :program:`mongos` instances in the
cluster, the user loses the access when the :program:`mongos` refreshes
their user caches. :program:`mongos` refreshes the user cache
automatically every :parameter:`userCacheInvalidationIntervalSecs`
(default is 30) seconds if there are changes. You can also manually
refresh the cache with the :dbcommand:`invalidateUserCache` command.

When you drop a role, MongoDB first revokes the role from all users that
currently have it, then revokes it from other roles, and finally removes
the role definition itself from the database.
