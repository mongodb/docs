If you use :ref:`SCRAM-SHA-1 <authentication-parameters>`:

- :term:`md5` is necessary but is not used for cryptographic purposes,
  and

- if you use :ref:`FIPS mode <fips-overview>`, then instead of
  :ref:`SCRAM-SHA-1 <authentication-parameters>` use:
  
  - :ref:`SCRAM-SHA-256 <authentication-scram>`,
  - :ref:`Kerberos <security-kerberos>`,
  - :ref:`LDAP <security-ldap>`, or
  - :ref:`x.509 <security-auth-x509>`
