Architecture
~~~~~~~~~~~~

In a production, deploy each member of the replica set to its own machine
and if possible bind to the standard MongoDB port of ``27017``. Use the
:setting:`bind_ip` option to ensure that MongoDB listens for connections
from applications on configured addresses.

See :doc:`/core/replica-set-architectures` for more information.

Connectivity
~~~~~~~~~~~~

Ensure that network traffic can pass between all members of the set
and all clients in the network securely and efficiently. Consider the
following:

- Establish a virtual private network. Ensure that your network topology
  routes all traffic between members within a single site over the local
  area network.

- Configure access control to prevent connections from unknown clients
  to the replica set.

- Configure networking and firewall rules so that incoming and outgoing
  packets are permitted only on the default MongoDB port and only from
  within your deployment.

Finally ensure that each member of a replica set is accessible by
way of resolvable DNS or hostnames. You should either configure your
DNS names appropriately or set up your systems' ``/etc/hosts`` file to
reflect this configuration.

Configuration
~~~~~~~~~~~~~

Specify the run time configuration on each system in a :doc:`configuration
file </reference/configuration-options>` stored in ``/etc/mongod.conf``
or a related location. Create the directory where MongoDB stores data
files before deploying MongoDB.

For more information about the run time options used above and other
configuration options, see :doc:`/reference/configuration-options`.
