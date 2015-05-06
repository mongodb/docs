Server Networking Access
~~~~~~~~~~~~~~~~~~~~~~~~

The servers that host the MongoDB processes must have full networking
access to each other through their fully qualified domain names (FQDNs),
as retrieved on each server by issuing ``hostname -f``. Each server must
be able to reach every other server through the FQDN.
