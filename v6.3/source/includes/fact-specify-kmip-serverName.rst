Starting in MongoDB 4.2.1 (and 4.0.14), you can specify multiple KMIP 
servers as a comma-separated list.

.. example::

   To specify both ``server1.example.com`` and ``server2.example.com`` 
   as KMIP servers, set |kmipServerName| to ``"server1.example.com,server2.example.com"``. 

You cannot specify the port number in |kmipServerName|. Instead,
specify the port with |kmipPort|. You may only specify one port and 
each host must use that port. 

On startup, :binary:`~bin.mongod` attempts to establish a connection to 
each server in the order listed and selects the first server it can
connect to. KMIP server selection only occurs at startup.
