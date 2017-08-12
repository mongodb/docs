Starting in MongoDB 3.6, MongoDB binaries, :program:`mongod` and
:program:`mongos`, bind to localhost (``127.0.0.1``) by default.
If the :setting:`net.ipv6` configuration file setting or the ``--ipv6``
command line option is set for a binary, the binary additionally binds
to the IPv6 address ``::1``.

Previously, starting from MongoDB 2.6, only the binaries from the
official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives)
and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by
default.

When bound only to the localhost, these MongoDB 3.6 binaries can only
accept connections from clients (including the :program:`mongo` shell,
other :program:`mongod` instances and :program:`mongos` instances) that
are running on the same machine. Remote clients cannot connect to the
binaries bound only to localhost.

To override and bind to other ip addresses, you can use the
:setting:`net.bindIp` configuration file setting or the ``--bind_ip``
command-line option to specify a list of ip addresses

For example, the following :program:`mongod` instance accepts client
connections from the localhost and another ip address

.. code-block:: sh

   mongod --bind_ip localhost,11.1.111.11

Remote clients to this instance must specify the ip address
``11.1.111.11`` or the associated hostname in order to connect:

.. code-block:: sh

   mongo --host 11.1.111.11

   mongo --host My-Example-HostName-Associated-With-11.1.111.11

