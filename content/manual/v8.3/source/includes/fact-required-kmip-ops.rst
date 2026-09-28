For an integration with a third-party key management appliance using 
the {+kmip-hover+}, you should allow the following KMIP operations:

- Create (``operation_create``)
- Get (``operation_get``)
- Activate (``operation_activate``)
- GetAttributes (``operation_get_attributes``)
- Encrypt (``operation_encrypt``)
- Decrypt (``operation_decrypt``)

MongoDB requires the Encrypt and Decrypt operations with the default
KMIP configuration. If you set :setting:`security.kmip.useLegacyProtocol`
to ``true`` in the MongoDB server
:ref:`configuration file <configuration-options>`, MongoDB uses the KMIP
1.0/1.1 protocol, which does not require these operations.