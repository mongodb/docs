.. versionadded:: 2.2

The |bi| provides a MySQL authentication plugin which implements the
client side of MongoDB-supported authentication mechanisms. The
``mongosql_auth`` plugin allows you to use |bi| with a MongoDB
instance running with authentication enabled without needing to
generate your own SSL certificates for authentication.

This plugin supports the following authentication mechanisms:

* ``SCRAM-SHA-1``
* ``PLAIN``

.. include:: /includes/fact-auth-mechanisms.rst
