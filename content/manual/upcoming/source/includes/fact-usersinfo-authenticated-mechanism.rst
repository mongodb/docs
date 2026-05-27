.. versionadded:: 9.0

Optional. Set to a string that represents a supported
authentication mechanism to determine where |function|
looks up user authorization information. See
:parameter:`authenticationMechanisms` for a list of mechanisms
and their associated strings.

If this field is not specified, |function| returns information
from :ref:`LDAP <security-ldap-external>` for users defined in
the ``$external`` database, and from the local authorization
database for :ref:`SCRAM <authentication-scram>` users.