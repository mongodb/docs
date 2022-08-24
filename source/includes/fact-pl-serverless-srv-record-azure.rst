**SRV Record for DNS Seedlist Private Endpoint-Aware Connection
Strings**

The following example shows the SRV record for an 
{+az-pl+}-enabled {+serverless-instance+}, showing one port defined for
``pl-0-eastus2.uzgh6.azure.mongodb.net``:


.. code-block:: sh
   :copyable: false

   $ nslookup -type=SRV _mongodb._tcp.serverlessinstance0-pe-1.oqg5v.azure.mongodb.net

   Server:  127.0.0.1
   Address:  127.0.0.1#53

   Non-authoritative answer:
   _mongodb._tcp.serverlessinstance0-pe-1.oqg5v.azure.mongodb.net service = 0 0 27017 serverlessinstance0-pe-1.oqg5v.azure.mongodb.net.

   In the preceding example:

   - ``_mongodb._tcp.serverlessinstance0-pe-1.oqg5v.azure.mongodb.net``
     is the SRV record that the connection string references. 
   - ``serverlessinstance0-pe-1.oqg5v.azure.mongodb.net`` is the
     hostname for the |service| {+serverless-instance+} for which you have configured {+az-pl+}.
    - ``27017`` is a unique port that |service| assigns to the load
      balancer for the |service| {+serverless-instance+} for which you
      enabled {+az-pl+}.
