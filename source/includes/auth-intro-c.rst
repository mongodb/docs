The MongoDB authentication plugin is embedded in the {+odbc-driver+}.
If your BI tool connects using the {+odbc-driver+} through a
:doc:`DSN </tutorial/create-system-dsn>` or the driver
directly, you do not need to install the authentication plugin
separately. Install the standalone authentication plugin if your BI
tool does not use an ODBC driver and accepts authentication plugins,
such the :doc:`MySQL shell </connect/mysql>`.

The ``mongosql_auth`` plugin allows a client to authenticate with a
|bi-short| and MongoDB deployment running with authentication enabled
using one of the following authentication mechanisms:

* ``SCRAM-SHA-1``
* ``SCRAM-SHA-256``
* ``PLAIN``

.. include:: /includes/fact-auth-mechanisms.rst
