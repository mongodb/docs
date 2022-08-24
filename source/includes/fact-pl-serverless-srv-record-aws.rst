**SRV Record for DNS Seedlist Private Endpoint-Aware Connection
Strings**

The following example shows the SRV record for an {+aws-pl+}-enabled
{+serverless-instance+}, showing one port defined for
``serverlessinstance0-pe-1.oqg5v.mongodb.net``:

.. code-block:: sh
   :copyable: false

   $ nslookup -type=SRV _mongodb._tcp.serverlessinstance0-pe-1.oqg5v.mongodb.net

    Server: 127.0.0.1
    Address: 127.0.0.1#53

         Non-authoritative answer:
         _mongodb._tcp.serverlessinstance0-pe-1.oqg5v.mongodb.net service = 0 0 27017 pe-1-serverlessinstance0.oqg5v.mongodb.net.

    In the preceding example:

    - ``_mongodb._tcp.serverlessinstance0-pe-1.oqg5v.mongodb.net`` 
      is the SRV record that the ``mongodb+srv://serverlessinstance0-pe-1.oqg5v.mongodb.net`` connection string references.
    - ``serverlessinstance0-pe-1.oqg5v.mongodb.net`` is the hostname
      for the |service| {+serverless-instance+} for which you have
      configured {+aws-pl+}.
    - ``27017`` is a unique port that |service| assigns to the load
      balancer for the |service| {+serverless-instance+} for which you
      enabled {+aws-pl+}.