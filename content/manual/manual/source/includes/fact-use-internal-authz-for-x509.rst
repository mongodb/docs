When set to ``true``, clients that authenticate using X.509
certificates always use internal authorization, even when
LDAP authorization is configured.

When set to ``false``, MongoDB uses LDAP
authorization for X.509-authenticated users if LDAP is
enabled. If LDAP is not enabled, internal authorization is
used regardless of this setting.

This parameter only affects X.509 authentication. It has no
impact on other authentication mechanisms.
