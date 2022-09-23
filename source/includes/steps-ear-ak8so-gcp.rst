a. Add the :setting:`spec.encryptionAtRest.googleCloudKms` object to 
   the :setting:`spec.encryptionAtRest` array in the
   :ref:`atlasproject-custom-resource`, including the
   following parameters:

   .. list-table::
      :widths: 50 50
      :header-rows: 1

      * - Parameter
        - Description

      * - ``spec.encryptionAtRest.awsKms.enabled``
        - Flag that indicates whether this project uses {+gcp+} |kms| 
          to encrypt data at rest. To enable encryption at rest using 
          {+gcp+} |kms|, set this parameter to ``true``. To disable
          encryption at rest using {+gcp+} |kms|, set this parameter to
          ``false``. If you disable encryption at rest using {+gcp+}
          |kms|, |ak8so| removes the configuration details.

      * - ``spec.encryptionAtRest.awsKms.``
          ``keyVersionResourceID``
        - Unique resource path that displays the key version resource
          ID for your {+gcp+} |kms|.
                    
      * - ``spec.encryptionAtRest.awsKms.``
          ``serviceAccountKey``
        - String-formatted |json| object containing {+gcp+} |kms|
          credentials from your {+gcp+} account.

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
            keyVersionResourceID: "projects/my-project-common-0/locations/us-east4/keyRings/my-key-ring-0/cryptoKeys/my-key-0/cryptoKeyVersions/1"
            serviceAccountKey: "{\"type\": \"service_account\",\"project_id\": \"my-project-common-0\",\"private_key_id\": \"e120598ea4f88249469fcdd75a9a785c1bb3\",\"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEuwIBA(truncated)SfecnS0mT94D9\\n-----END PRIVATE KEY-----\\n\",\"client_email\": \"my-email-kms-0@my-project-common-0.iam.gserviceaccount.com\",\"client_id\": \"10180967717292066\",\"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\"token_uri\": \"https://accounts.google.com/o/oauth2/token\",\"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/my-email-kms-0%40my-project-common-0.iam.gserviceaccount.com\"}"
      EOF