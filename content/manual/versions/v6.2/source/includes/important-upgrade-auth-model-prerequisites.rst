.. FYI -- should be noted as important in the auth upgrade section.

Before upgrading the authorization model, you should first upgrade
MongoDB binaries to 2.6. For sharded clusters, ensure that **all**
cluster components are 2.6. If there are users in any database, be sure
you have at least one user in the ``admin`` database with the role
:authrole:`userAdminAnyDatabase` **before** upgrading the MongoDB
binaries.
