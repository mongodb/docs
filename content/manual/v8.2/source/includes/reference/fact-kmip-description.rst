When ``true``, ``mongod`` uses KMIP protocol version 1.0 or 1.1 instead
of the default version. The default KMIP protocol is version 1.2.

To use :ref:`audit log encryption <security-encryption-at-rest-audit-log>`
with KMIP version 1.0 or 1.1, you must specify
:parameter:`auditEncryptKeyWithKMIPGet` at startup.
