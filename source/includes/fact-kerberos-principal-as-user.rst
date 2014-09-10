Add a Kerberos principal, ``<username>@<KERBEROS REALM>`` or
``<username>/<instance>@<KERBEROS REALM>``, to MongoDB in the
``$external`` database. Specify the Kerberos realm in all uppercase.
The ``$external`` database allows :program:`mongod` to consult an
external source (e.g. Kerberos) to authenticate.
