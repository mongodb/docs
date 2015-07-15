Server Networking Access
~~~~~~~~~~~~~~~~~~~~~~~~

The servers that host the MongoDB processes must have full networking
access to each other through their fully qualified domain names (FQDNs).
You can view a server's FQDN by issuing ``hostname -f`` in a shell
connected to the server. Each server must be able to reach every other
server through the FQDN.

Ensure that your network configuration allows each Automation Agent to
connect to every MongoDB process listed on the :guilabel:`Deployment` tab.
Ensure that the network and security systems, including all interfaces and
firewalls, allow these connections.
