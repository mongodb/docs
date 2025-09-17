.. warning:: 

   Depending on your system topology, it may be necessary 
   to bind the ``mongot`` query server to an interface accessible 
   from your MongoDb Cluster. While binding to the ``0.0.0.0`` 
   IP address is permitted, it exposes the server to all public 
   networks and carries the risk of unauthorized access. 
   
   To enhance security, consider restricting ``server.grpc.address`` 
   to specific interfaces that are controlled and protected at 
   the network layer such as ``localhost`` or other trusted 
   internal addresses.