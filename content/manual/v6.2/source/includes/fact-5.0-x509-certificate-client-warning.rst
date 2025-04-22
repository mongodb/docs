Starting in MongoDB 5.0, :binary:`mongod` and :binary:`mongos` now 
issue a startup warning when their certificates do not include a 
:term:`Subject Alternative Name` attribute.

The following platforms do not support common name validation:

- iOS 13 and higher
- MacOS 10.15 and higher
- Go 1.15 and higher

Clients using these platforms will not
:ref:`authenticate <x509-client-authentication>` to 
MongoDB servers that use x.509 certificates whose hostnames are 
:ref:`specified by CommonName attributes 
<KMIP-subject-alternative-name-CN>`.