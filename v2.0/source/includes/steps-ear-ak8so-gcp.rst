a. Add the :setting:`spec.encryptionAtRest.googleCloudKms` object to 
   the :setting:`spec.encryptionAtRest` array in the
   :ref:`atlasproject-custom-resource`, including the
   following parameters:

   .. list-table::
      :widths: 50 50
      :header-rows: 1

      * - Parameter
        - Description

      * - ``spec.encryptionAtRest.googleCloudKms.enabled``
        - Flag that indicates whether this project uses {+gcp+} |kms| 
          to encrypt data at rest. To enable encryption at rest using 
          {+gcp+} |kms|, set this parameter to ``true``. To disable
          encryption at rest using {+gcp+} |kms|, set this parameter to
          ``false``. If you disable encryption at rest using {+gcp+}
          |kms|, |ak8so| removes the configuration details.

      * - ``spec.encryptionAtRest.googleCloudKms.secretRef.name``
        - Name of the secret that contains your |gcp| credentials.
                    
      * - ``spec.encryptionAtRest.googleCloudKms.secretRef.namespace``
        - Namespace that contains your |gcp| credentials. If 
          unspecified, this parameter defaults to the namespace of the 
          ``AtlasProject`` custom resource.

   You must use a |k8s-secret| that contains the values 
   for ``KeyVersionResourceID`` and ``ServiceAccountKey``.

#. Run the following command:

   .. code-block:: sh

      cat <<EOF | kubectl apply -f -
      apiVersion: atlas.mongodb.com/v1
      kind: AtlasProject
      metadata:
        name: my-project
      spec:
        name: Test Atlas Operator Project
        encryptionAtRest:
          googleCloudKms: 
            enabled: true
            secretRef:
              name: gcp-ear-creds
              namespace: mongodb-atlas-system
      EOF
      