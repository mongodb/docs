.. FYI -- should be noted as important in the auth upgrade section.

Before upgrading the authorization model, you should first upgrade
MongoDB binaries to 2.6. For sharded clusters, ensure that **all**
cluster components are 2.6. Be sure you have at least one user in the
``admin`` database *before* upgrading the MongoDB binaries. To upgrade
the authorization model, you must have a user in the ``admin`` database
with the role :authrole:`userAdminAnyDatabase`.
