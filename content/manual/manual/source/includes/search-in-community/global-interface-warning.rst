.. warning:: 

   Depending on your system topology, you might need to bind the
   ``mongot`` query server to an interface reachable from your
   MongoDB Cluster. While binding to the ``0.0.0.0`` IP address is
   permitted, it exposes the server to all public networks and
   carries the risk of unauthorized access.

   If ``mongot`` is not co-located with ``mongod`` on a trusted
   host, enable TLS for ``server.grpc.tls`` and restrict network
   access with host firewalls, security groups, or equivalent
   controls.

   To enhance security, consider restricting
   ``server.grpc.address`` to specific interfaces that are
   controlled and protected at the network layer such as
   ``localhost`` or other trusted internal addresses.