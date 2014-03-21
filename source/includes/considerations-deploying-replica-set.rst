Architecture
~~~~~~~~~~~~

In a production, deploy each member of the replica set to its own machine
and if possible bind to the standard MongoDB port of ``27017``. Use the
:setting:`bind_ip` option to ensure that MongoDB listen for connections
from applications on the configured address.

For a geographically distributed replica set, ensure that one system
resides in each secondary site, while the remaining systems are in the
primary site.

See :doc:`/core/replica-set-architectures` for more information.

Connectivity
~~~~~~~~~~~~

Ensure that network traffic can pass between all members in the network
securely and efficiently. Consider the following:

- Establish a virtual private network. Ensure that your network topology
  routes all traffic between members within a single site over the local
  area network.

- Configure authentication so that only servers and processes with
  authentication can connect to the replica set.

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
file </reference/configuration-options>` stored in ``/etc/mongodb.conf``
or a related location. Create the directory where MongoDB stores data
files before deploying MongoDB.

For more information about the run time options used above and other
configuration options, see :doc:`/reference/configuration-options`.
