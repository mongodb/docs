When you drop a role, users authenticated with the role lose the role's
privileges but remain logged in. They continue to have privileges from other
roles.

If a user is authenticated with the role on a :binary:`~bin.mongod`, the user
loses the role's privileges immediately. If the user is authenticated on a
:binary:`~bin.mongos`, the user loses access when the user cache refreshes,
which occurs either automatically through the
:parameter:`userCacheInvalidationIntervalSecs` parameter or manually through
the :dbcommand:`invalidateUserCache` command. The user loses access
immediately on the :binary:`~bin.mongos` used to make the change.
The default
setting for the :parameter:`userCacheInvalidationIntervalSecs` parameter
is 600 seconds (i.e., 10 minutes).

When you drop a role, MongoDB first revokes the role from all users that
currently have it, then revokes it from other roles, and finally removes
the role definition itself from the database.
