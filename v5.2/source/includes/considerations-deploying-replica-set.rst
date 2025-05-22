Architecture
~~~~~~~~~~~~

In production, deploy each member of the replica set to its own machine
and if possible bind to the standard MongoDB port of ``27017``. 

See :doc:`/core/replica-set-architectures` for more information.

Hostnames
~~~~~~~~~

.. include:: /includes/important-hostnames.rst

IP Binding
~~~~~~~~~~

Use the :option:`--bind_ip <mongod --bind_ip>` option to ensure that
MongoDB listens for connections from applications on configured
addresses.

.. versionchanged:: 3.6

   .. include:: /includes/fact-default-bind-ip.rst

Connectivity
~~~~~~~~~~~~

Ensure that network traffic can pass securely between all members of the set and
all clients in the network .

Consider the following:

- Establish a virtual private network. Ensure that your network topology
  routes all traffic between members within a single site over the local
  area network.

- Configure access control to prevent connections from unknown clients
  to the replica set.

- Configure networking and firewall rules so that incoming and outgoing
  packets are permitted only on the default MongoDB port and only from
  within your deployment. See the IP Binding considerations.

Ensure that each member of a replica set is accessible by
way of resolvable DNS or hostnames. You should either configure your
DNS names appropriately or set up your systems' ``/etc/hosts`` file to
reflect this configuration.

Each member must be able to connect to every other member. For
instructions on how to check your connection, see
:ref:`replica-set-troubleshooting-check-connection`.

Configuration
~~~~~~~~~~~~~

Create the directory where MongoDB stores data files before deploying
MongoDB.

Specify the :binary:`~bin.mongod` configuration in a :doc:`configuration
file </reference/configuration-options>` stored in ``/etc/mongod.conf``
or a related location.

For more information about configuration options, see
:doc:`/reference/configuration-options`.
