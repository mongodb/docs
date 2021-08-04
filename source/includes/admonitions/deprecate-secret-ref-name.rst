.. important:: Deprecation Notice

   The :opsmgrkube:`spec.security.tls.secretRef.name` field is deprecated
   for the MongoDB resources and for the application database in the
   |onprem| resources. You can continue using :opsmgrkube:`spec.security.tls.secretRef.name`
   for the |onprem| resources other than the application database.
   
   This field will remain in future releases to maintain backwards
   compatibility. Instead of the deprecated field, use:

   - :opsmgrkube:`spec.applicationDatabase.security.tls.secretRef.prefix`,
     for the application database in your |onprem| resources.
   - :setting:`spec.security.tls.secretRef.prefix`, for MongoDB resources.

   
