.. important:: 

   Enabling encryption using a KMIP server on Windows fails when using 
   |kmip-client-cert-file| and the KMIP server enforces TLS 1.2.

   To enable encryption at rest with KMIP on Windows, you must:

   - Import the client certificate into the Windows Certificate Store.
   - Use the |kmip-client-cert-selector| option.

