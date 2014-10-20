.. important:: MMS uses the client IP address for auditing and access
   control to the API. When you access MMS through a load balancer,
   the network security layer should not permit direct access to the
   MMS web server. If you do not restrict access, clients will be able
   to inject HTTP headers and spoof a client IP address.
