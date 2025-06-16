.. versionadded:: 2.2

The |bi| provides a client-side MySQL authentication plugin for Java that
integrates with `MySQL's Connector/J JDBC driver
<https://mvnrepository.com/artifact/mysql/mysql-connector-java>`_.
The ``mongosql_auth`` plugin allows a client to authenticate with a
|bi-short| and MongoDB deployment running with authentication enabled
using one of the following authentication mechanisms:

- ``SCRAM-SHA-1``
- ``SCRAM-SHA-256``
- ``PLAIN`` (LDAP)
- ``GSSAPI`` (Kerberos)

.. include:: /includes/fact-auth-mechanisms.rst