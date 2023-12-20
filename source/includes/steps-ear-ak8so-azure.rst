a. Add the :setting:`spec.encryptionAtRest.azureKeyVault` object to 
   the :setting:`spec.encryptionAtRest` array in the
   :ref:`atlasproject-custom-resource`, including the
   following parameters:

   .. list-table::
      :widths: 50 50
      :header-rows: 1

      * - Parameter
        - Description

      * - ``spec.encryptionAtRest.azureKeyVault.azureEnvironment``
        - |azure| deployment location where the |azure| account
          credentials reside. Valid values include ``AZURE``,
          ``AZURE_CHINA``, and ``AZURE_GERMANY``.

      * - ``spec.encryptionAtRest.azureKeyVault.clientID``
        - Unique 36-hexadecimal character string that 
          identifies your |azure| application.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``enabled``
        - Flag that indicates whether this project uses |azure| Key
          Vault to encrypt data at rest. To enable encryption at rest
          using |azure| Key Vault, set this parameter to ``true``. To
          disable encryption at rest using |azure| Key Vault, set this
          parameter to ``false``. If you disable encryption at rest
          using |azure| key vault, |ak8so| removes the configuration
          details.

      * - ``spec.encryptionAtRest.azureKeyVault.resourceGroupName``
        - Label that identifies the |azure| resource group 
          that contains your |azure| Key Vault. |azure| 
          displays the resource group name on the resource 
          group's details page.

      * - ``spec.encryptionAtRest.azureKeyVault.secretRef.name``
        - Name of the secret that contains your |azure| credentials.
                    
      * - ``spec.encryptionAtRest.azureKeyVault.secretRef.namespace``
        - Namespace that contains your |azure| credentials. If 
          unspecified, this parameter defaults to the namespace of the 
          ``AtlasProject`` custom resource.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``tenantID``
        - Unique 36-hexadecimal character string that identifies the
          |azure| Active Directory tenant within your |azure|
          subscription. |azure| displays the tenant ID on the tenant
          properties page.

   You must use a |k8s-secret| that contains the values 
   for ``KeyVaultName``, ``KeyIdentifier``, ``Secret``, and 
   ``SubscriptionID``.

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
          azureKeyVault: 
            azureEnvironment: AZURE
            clientID: "12345678-90ab-cdef-1234-567890abcdef"
            enabled: true
            resourceGroupName: "myResourceGroup"
            tenantID: "e8e4b6ba-ff32-4c88-a9af-EXAMPLEID"
            secretRef:
              name: azure-ear-creds
              namespace: mongodb-atlas-system
      EOF
      