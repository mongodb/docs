
By default, MongoDB launches with :setting:`~net.bindIp` set to
``127.0.0.1``, which binds it to the localhost network interface. This
means that the |executable-name| instance only accepts connections from
clients running on the same machine. To allow remote clients to access
the |executable-name| instance or to initialize a :term:`replica set` on
the instance, you must bind |executable-name| to a publicly-accessible
network interface.

To bind the network interface, use the :setting:`~net.bindIp` setting in
the configuration file or start |executable-name| with the
:option:`--bind_ip <mongod --bind_ip>` command-line option.

.. include:: /includes/warning-bind-ip-security-considerations.rst

For more information on configuring :setting:`~net.bindIp`, see
:ref:`ip-binding`.

