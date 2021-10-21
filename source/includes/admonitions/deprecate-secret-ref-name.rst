.. important:: Deprecation Notice

   The :setting:`spec.security.tls.secretRef.name`, 
   :opsmgrkube:`spec.applicationDatabase.security.tls.secretRef.name`, 
   and :opsmgrkube:`spec.security.tls.secretRef.name`
   settings are deprecated.
   
   These fields will remain in future releases to maintain backwards
   compatibility.

   If you omit these settings,
   the |k8s-op-short| expects the secrets that contain your
   |tls| certificates to begin with: 
   ``<metadata.name>``, where ``<metadata.name>`` 
   specifies the name of one of the following resources:

   - |onprem| resource for application database deployments and |onprem| resources
   - Database resource for other database deployments

   To learn more about adding an optional prefix to the secret
   name, see:

   - :opsmgrkube:`spec.applicationDatabase.security.certsSecretPrefix`
     for the application database in your |onprem| resources.
   - :opsmgrkube:`spec.security.certsSecretPrefix` for |onprem| resources.
   - :setting:`spec.security.certsSecretPrefix` for MongoDB resources.
