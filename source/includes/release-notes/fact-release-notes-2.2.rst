Authentication Plugins
~~~~~~~~~~~~~~~~~~~~~~

|bi| Version 2.0 introduced passthrough authentication,
in which clients authenticate as a user defined in MongoDB, without
the need to create a separate user within the connector itself.

|bi| Version 2.2 further increases ease of use with
a set of authentication plugins which can authenticate users
through the connector without the need for SSL certificates.
These plugins perform user authentication via the SASL framework
and support the SCRAM-SHA-1 and PLAIN authentication mechanisms.
We currently provide authentication plugins in the following languages:

- :doc:`Java </tutorial/install-auth-plugin-jdbc>` - for use with
  MySQL’s Connector/J driver
- :doc:`C </reference/auth-plugin-c>` - for use with the MySQL ODBC
  driver and the MySQL Shell
