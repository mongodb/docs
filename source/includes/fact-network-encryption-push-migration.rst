Network Encryption
~~~~~~~~~~~~~~~~~~

During push live migrations, if the source cluster does not use TLS encryption
for its data, the traffic from the source cluster to the migration host
is not encrypted, but the traffic from the migration host to |service| is
encrypted. Determine if this is acceptable before you start a push live
migration procedure.
