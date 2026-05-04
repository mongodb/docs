By default, MongoDB launches with :setting:`~net.bindIp` set to
``127.0.0.1``, which binds to the localhost network interface. This
means that the |executable-name| can only accept connections from
clients that are running on the same machine. Remote clients will not be
able to connect to the |executable-name|, and the |executable-name| will
not be able to initialize a :term:`replica set` unless this value is set
to a valid network interface.

This value can be configured either:

- in the MongoDB configuration file with :setting:`~net.bindIp`, or
- via the command-line argument :option:`--bind_ip <mongod --bind_ip>`

.. include:: /includes/warning-bind-ip-security-considerations.rst

For more information on configuring :setting:`~net.bindIp`, see
:doc:`/core/security-mongodb-configuration`.
