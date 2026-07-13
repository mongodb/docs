After all nodes restart successfully with TLS enabled, update
the configuration file on each node. Change
``net.tls.mode`` from ``allowTLS`` to ``requireTLS`` to
enforce encrypted connections for all clients and members:

.. code-block:: yaml

   net:
     tls:
       mode: requireTLS