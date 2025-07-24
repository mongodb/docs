The service name of the `SRV resource records <https://www.rfc-editor.org/rfc/rfc2782>`__
that the driver retrieves to construct your seedlist. The driver uses the service name to
create the SRV URI, which matches the following format:

.. code-block::
    
    _{srvServiceName}._tcp.{hostname}.{domainname}

This property overrides the default service name for SRV lookup in
discovery and polling. The default value is ``"mongodb"``.

You can use this property only if the connection-string scheme is set
to ``ConnectionStringScheme.MongoDBPlusSrv``. You cannot use it when connecting
to a replica set.