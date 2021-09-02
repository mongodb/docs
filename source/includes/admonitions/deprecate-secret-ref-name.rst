.. important:: Deprecation Notice

   The :setting:`spec.security.tls.secretRef.name`
   and 
   :opsmgrkube:`spec.applicationDatabase.security.tls.secretRef.name`
   fields are deprecated for the MongoDB resources and for the
   application database in the |onprem| resources. You can continue 
   using :opsmgrkube:`spec.security.tls.secretRef.name`
   for the |onprem| resources other than the application database.
   
   This field will remain in future releases to maintain backwards
   compatibility.

   If you omit
   :opsmgrkube:`spec.applicationDatabase.security.tls.secretRef.name`,
   the |k8s-op-short| expects the secrets that contain your
   |tls| certificates for database resources to follow this naming 
   convention: ``<metadata.name>-cert``, where ``<metadata.name>`` 
   specifies the name of one of the following resources:

   - |onprem| resource for application database deployments
   - Database resource for other database deployments

   For information about pre-pending an optional prefix to the secret
   name, see:

   - :opsmgrkube:`spec.applicationDatabase.security.tls.secretRef.prefix`
     for the application database in your |onprem| resources.
   - :setting:`spec.security.tls.secretRef.prefix` for MongoDB resources.
