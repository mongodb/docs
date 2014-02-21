.. begin-nondist-dns

- Each member of the replica set resides on its own machine and all of
  the MongoDB processes bind to port ``27017`` (the
  standard MongoDB port).

- Each member of the replica set must be accessible by way of
  resolvable DNS or hostnames, as in the following scheme:

  - ``mongodb0.example.net``
  - ``mongodb1.example.net``
  - ``mongodb2.example.net``
  - ``mongodbn.example.net``

  You will need to *either* configure your DNS names appropriately,
  *or* set up your systems' ``/etc/hosts`` file to reflect this configuration.

.. end-nondist-dns

  For a geographically distributed replica set, you should ensure that
  one system (e.g. ``mongodb2.example.net``) resides in each secondary
  site (e.g. Site B), while the remaining systems are in Site A.

.. begin-nondist-routing

- Ensure that network traffic can pass between all members in the
  network securely and efficiently. Consider the following:

  - Establish a virtual private network. Ensure that your network
    topology routes all traffic between members within a single
    site over the local area network.

  - Configure authentication using :setting:`auth` and
    :setting:`keyFile`, so that only servers and processes with
    authentication can connect to the replica set.

  - Configure networking and firewall rules so that only traffic
    (incoming and outgoing packets) on the default MongoDB port (e.g.
    ``27017``) from *within* your deployment is permitted.

  For more information on security and firewalls, see :ref:`replica-set-security`.

- You must specify the run time configuration on each system in a
  :doc:`configuration file </reference/configuration-options>` stored
  in ``/etc/mongodb.conf`` or a related location. *Do not* specify the
  set's configuration in the :program:`mongo` shell.

  Use the following configuration for each of your MongoDB instances.
  You should set values that are appropriate for your systems, as needed:

  .. code-block:: cfg

     port = 27017

     bind_ip = 10.8.0.10

     dbpath = /srv/mongodb/

     fork = true

     replSet = rs0

  The :setting:`dbpath` indicates where you want :program:`mongod` to
  store data files. The :setting:`dbpath` must exist before you start
  :program:`mongod`. If it does not exist, create the directory and
  ensure :program:`mongod` has permission to read and write data to this
  path.

  Modifying :setting:`bind_ip` ensures that :program:`mongod` will only
  listen for connections from applications on the configured address.

  For more information about the run time options used above and other
  configuration options, see
  :doc:`/reference/configuration-options`.

.. end-nondist-routing
