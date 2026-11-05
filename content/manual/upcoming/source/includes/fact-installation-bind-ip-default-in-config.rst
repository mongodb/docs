
By default, MongoDB launches with :setting:`~net.bindIp` set to
``127.0.0.1``, which binds to the localhost network interface. This
means that the |executable-name| accepts connections only from clients
running on the same machine. Remote clients cannot connect to the
|executable-name|, and the |executable-name| cannot initialize a
:term:`replica set` unless this value is set to a valid network
interface.

This value can be configured either:

- Using the MongoDB configuration file with :setting:`~net.bindIp`

- Using the command-line argument :option:`--bind_ip <mongod --bind_ip>`

.. include:: /includes/warning-bind-ip-security-considerations.rst

For more information on configuring :setting:`~net.bindIp`, see
:ref:`ip-binding`.

