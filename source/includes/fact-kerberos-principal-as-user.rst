Add a Kerberos principal, ``<username>@<KERBEROS REALM>`` or
``<username>/<instance>@<KERBEROS REALM>``, to MongoDB in the
``$external`` database. Specify the Kerberos realm in all uppercase.
The ``$external`` database allows :program:`mongod` to consult an
external source (e.g. Kerberos) to authenticate.

If you are running both the Monitoring Agent and the Backup Agent on
the same server, then both agents must connect as the same Kerberos
Principal. If each agent is going to use its own Kerberos Principal,
then you must create a user in the ``$external`` database for each
Kerberos Principal.