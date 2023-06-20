
Cluster members can use X.509 certificates for :ref:`membership
authentication <internal-auth-x509>` to identify other servers
in the same deployment.

When the server receives a connection request, it compares the 
Distinguished Name (DN) values or the extension value string 
of the certificate to the configured values of the 
:setting:`~net.tls.clusterAuthX509` setting and
:parameter:`tlsClusterAuthX509Override` parameter.
If the values match, it treats the connection as a cluster member. 

