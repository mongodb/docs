This tutorial covers creating the minimum number of administrative
users on the ``admin`` database *only*. For the user authentication,
the tutorial uses the default :doc:`/core/security-scram`
authentication mechanism. Challenge-response security mechanisms are
best suited for testing or development environments. For production
environments, we recommend using :doc:`x.509
certificates</core/security-x.509>` or :doc:`/core/security-ldap`
(available for MongoDB Enterprise only) or :doc:`/core/kerberos`
(available for MongoDB Enterprise only).

For details on creating users for specific authentication mechanism,
refer to the specific authentication mechanism pages.

See :ref:`security-checklist-role-based-access-control` for best
practices for user creation and management.
