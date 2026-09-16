On hosts with Cyrus SASL 2.1.28 or later, MongoDB does not support LDAP
SASL binding with the ``DIGEST-MD5`` mechanism. If you set
:setting:`security.ldap.bind.method` to ``sasl`` and specify
``DIGEST-MD5`` in :setting:`security.ldap.bind.saslMechanisms`,
``mongod`` and ``mongos`` fail to start.
