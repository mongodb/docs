.. versionadded:: 2.2

The |bi| provides a client-side MySQL authentication plugin for Java that
integrates with `MySQL's Connector/J JDBC driver
<https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-installing.html>`_
and implements the client side of MongoDB-supported authentication
mechanisms.

This plugin supports the following mechanisms:

- ``SCRAM-SHA-1``
- ``PLAIN``

.. include:: /includes/fact-auth-mechanisms.rst