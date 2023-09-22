
When the server authenticates connections from members, it analyzes the
X.509 certificate to determine whether it belongs to a cluster member.
If the server uses the :setting:`~net.tls.clusterAuthX509.attributes` 
setting or the ``attributes`` field on the 
:parameter:`tlsClusterAuthX509Override` parameter, it checks 
the Distinguished Name (DN) values of the certificate.
If the :setting:`~net.tls.clusterAuthX509.extensionValue` setting or the
``extensionValue`` field of 
the :parameter:`tlsClusterAuthX509Override` parameter is set, it checks 
the extension values of the certificate.  If it finds a match,
it authorizes the connection as a peer.

