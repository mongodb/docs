.. setting:: Proxy Server PEM File

   *Type*: string

   *Default*: ``/etc/mongodb-mms/queryable-backup.pem``

   
   Required if using Queryable Snapshot. |pem| file that contains the
   full certificate chain for one or more trusted certificates and the
   associated private keys.
   
   :setting:`Proxy Server PEM File` has the following restrictions:
   
   - This PEM file must be different than the one used for |https|
     connections to |onprem| (:setting:`HTTPS PEM Key File`).
   - This PEM file should use a key length greater than 512-bit. Using a
     2048-bit RSA key is recommended.
   - This PEM file should use a message digest stronger than ``sha1``,
     such as ``sha256``.
   
   .. note::
   
      After updating :setting:`Proxy Server PEM File`, restart the Web
      Server for the change to take effect.
   
   Corresponds to :setting:`brs.queryable.pem`.
   

