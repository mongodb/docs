This tutorial covers creating the minimum number of administrative
users on the ``admin`` database *only*. For the user authentication,
the tutorial uses the default :ref:`authentication-scram`
authentication mechanism. Challenge-response security mechanisms are
best suited for testing or development environments. For production
environments, we recommend using :ref:`X.509
certificates <security-auth-x509>` or :ref:`security-ldap`
(available for MongoDB Enterprise only) or :ref:`security-kerberos`
(available for MongoDB Enterprise only).

For details on creating users for specific authentication mechanism,
refer to the specific authentication mechanism pages.

See :ref:`security-checklist-role-based-access-control` for best
practices for user creation and management.
