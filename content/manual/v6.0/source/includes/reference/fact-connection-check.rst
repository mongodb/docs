``mongod`` verifies the connection to the KMIP server on startup.

The server name specified in :option:`--kmipServerName
<mongod --kmipServerName>` must match either the Subject Alternative
Name ``SAN`` or the Common Name ``CN`` on the certificate presented by
the KMIP server. ``SAN`` can be a system name or an IP address. 

If ``SAN`` is present, ``mongod`` does not try to match against ``CN``.

If the hostname or IP address of the KMIP server does does not match
either ``SAN`` or ``CN``, ``mongod`` does not start.
