Starting in MongoDB 5.2, the update interval for cached user information
retrieved from an LDAP server depends on
:parameter:`ldapShouldRefreshUserCacheEntries`:

- If true, use :parameter:`ldapUserCacheRefreshInterval`.

- If false, use :parameter:`ldapUserCacheInvalidationInterval`.
