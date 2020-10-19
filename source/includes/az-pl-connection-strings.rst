When you configure a private endpoint, |service| generates DNS
seedlist and standard private endpoint-aware connection strings:

- DNS seedlist connection

  .. code-block:: none
     :copyable: false

     mongodb+srv://cluster0-pl-0.uzgh6.azure.mongodb.net

- Standard connection string

  .. code-block:: none
     :copyable: false

     mongodb://pl-0-eastus2.uzgh6.azure.mongodb.net:1024,pl-0-eastus2.uzgh6.azure.mongodb.net:1025,pl-0-eastus2.uzgh6.azure.mongodb.net:1026/?ssl=truereplicaSet=atlas-18bndf-shard-0

When a client in your VNet connects to an |service| cluster using one of
these private endpoint-aware connection strings, the client attempts to
establish a connection to the Private Link Service in the |service| VNet
through the private endpoint's network interface. The Private Link
service sends traffic through an |azure| Standard Load Balancer to the
|service| cluster nodes that you deployed in that region. Your
client's |dns| resolution mechanism handles resolving the hostname to
the network interface's private IP address. The driver is only aware of
the hostname in the connection string, listening on one port for each 
node in the cluster's replica set.

**SRV Record for DNS Seedlist Private Endpoint-Aware Connection Strings**

The following example shows the SRV record for an {+az-pl+}-enabled
single-region cluster, showing three unique ports defined for
``pl-0-eastus2.uzgh6.azure.mongodb.net``:


.. code-block:: sh
   :copyable: false

   $ nslookup -type=SRV _mongodb._tcp.cluster0-pl-0.uzgh6.azure.mongodb.net

   Server:  127.0.0.53
   Address:  127.0.0.53#53

   Non-authoritative answer:
   _mongodb._tcp.cluster0-pl-0.uzgh6.azure.mongodb.net service = 0 0 1024 pl-0-eastus2.uzgh6.azure.mongodb.net.
   _mongodb._tcp.cluster0-pl-0.uzgh6.azure.mongodb.net service = 0 0 1025 pl-0-eastus2.uzgh6.azure.mongodb.net.
   _mongodb._tcp.cluster0-pl-0.uzgh6.azure.mongodb.net service = 0 0 1026 pl-0-eastus2.uzgh6.azure.mongodb.net.

.. tip::

   In the preceding example:

   - ``_mongodb._tcp.cluster0-pl-0.uzgh6.azure.mongodb.net`` is the SRV
     record that the connection string references. 
   - ``pl-0-eastus2.uzgh6.azure.mongodb.net`` is the hostname for each
     node in one |service| cluster in one region for which you have
     configured {+az-pl+}.
   - ``1024``, ``1025``, and ``1026`` are unique ports that |service|
     assigns on the load balancer for each |service| replica set node in
     the region for which you enabled {+az-pl+}. All nodes in an
     |service| replica set are accessible via the same hostname, with
     the load balancer resolving individual nodes by their unique port.

**Hostname DNS Resolution in Private Endpoint-Aware Connection Strings and SRV Records**

The hostname in the SRV record and the standard connection string is an
|dns| ``A`` record that resolves to the private IP address of the
private endpoint's network interface. 

The following example shows the |dns| lookup for the hostname in the 
SRV record and in the standard connection string:

.. code-block:: sh
   :copyable: false

   $ nslookup pl-0-eastus2.uzgh6.azure.mongodb.net
   Server:  127.0.0.53
   Address:  127.0.0.53#53

   Non-authoritative answer:
   Name:	pl-0-eastus2.uzgh6.azure.mongodb.net
   Address: 10.0.0.4
