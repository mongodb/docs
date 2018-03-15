.. versionadded:: 2.2

The |bi| provides a MySQL authentication plugin which implements the
client side of MongoDB-supported authentication mechanisms. The
``mongosql_auth`` plugin allows a client to authenticate with a
|bi-short| and MongoDB deployment running with authentication enabled
using one of the following authentication mechanisms:

* ``SCRAM-SHA-1``
* ``PLAIN``

.. include:: /includes/fact-auth-mechanisms.rst
