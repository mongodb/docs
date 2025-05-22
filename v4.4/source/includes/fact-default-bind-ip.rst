.. begin-intro

Starting in MongoDB 3.6, MongoDB binaries, :binary:`~bin.mongod` and
:binary:`~bin.mongos`, bind to localhost by default. If the
:setting:`net.ipv6` configuration file setting or the ``--ipv6``
command line option is set for the binary, the binary additionally binds
to the localhost IPv6 address.

.. end-intro

Previously, starting from MongoDB 2.6, only the binaries from the
official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives)
and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by
default.

When bound only to the localhost, these MongoDB 3.6 binaries can only
accept connections from clients (including the :binary:`~bin.mongo` shell,
other members in your deployment for replica sets and sharded clusters)
that are running on the same machine. Remote clients cannot connect to
the binaries bound only to localhost.

.. begin-override

To override and bind to other ip addresses, you can use the
:setting:`net.bindIp` configuration file setting or the
``--bind_ip`` command-line option to specify a list of hostnames or ip
addresses.

.. include:: /includes/warning-bind-ip-security-considerations.rst

For example, the following :binary:`~bin.mongod` instance binds to both
the localhost and the hostname ``My-Example-Associated-Hostname``, which is
associated with the ip address ``198.51.100.1``:

.. code-block:: none

   mongod --bind_ip localhost,My-Example-Associated-Hostname

In order to connect to this instance, remote clients must specify
the hostname  or its associated ip address ``198.51.100.1``:

.. code-block:: none

   mongo --host My-Example-Associated-Hostname

   mongo --host 198.51.100.1

.. end-override
