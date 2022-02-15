If you use :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`:

- :term:`md5` is necessary but is not used for cryptographic purposes,
  and

- if you use :doc:`FIPS mode </tutorial/configure-fips>`, then instead
  of :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>` use:
  
  - :ref:`SCRAM-SHA-256 <authentication-scram-sha-256>`,
  - :ref:`Kerberos <security-kerberos>`,
  - :ref:`LDAP <security-ldap>`, or
  - :ref:`x.509 <security-auth-x509>`
