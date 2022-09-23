a. Add the :setting:`spec.encryptionAtRest.azureKeyVault` object to 
   the :setting:`spec.encryptionAtRest` array in the
   :ref:`atlasproject-custom-resource`, including the
   following parameters:

   .. list-table::
      :widths: 50 50
      :header-rows: 1

      * - Parameter
        - Description

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``azureEnvironment``
        - |azure| deployment location where the |azure| account
          credentials reside. Valid values are ``AZURE``,
          ``AZURE_CHINA``, and ``AZURE_GERMANY``.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``clientID``
        - Unique 36-hexadecimal character string that identifies your 
          |azure| application.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``enabled``
        - Flag that indicates whether this project uses |azure| Key
          Vault to encrypt data at rest. To enable encryption at rest
          using |azure| Key Vault, set this parameter to ``true``. To
          disable encryption at rest using |azure| Key Vault, set this
          parameter to ``false``. If you disable encryption at rest
          using |azure| key vault, |ak8so| removes the configuration
          details.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``keyIdentifier``
        - Web address with a unique key that identifies your |azure|
          Key Vault.
                    
      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``keyVaultName``
        - Unique string that identifies the |azure| Key Vault that
          contains your key.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``resourceGroupName``
        - Human-readable label that identifies the |azure| resource
          group that contains your |azure| Key Vault. |azure| displays
          the resource group name on the resource group's details page.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``secret``
        - Private data associated with the
          |azure| Key Vault tenant you specify in 
          ``spec.encryptionAtRest.azureKeyVault.tenantID``.
      
      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``subscriptionID``
        - Unique 36-hexadecimal character string that identifies your
          |azure| subscription. |azure| displays the subscription ID on
          the subscription's details page.

      * - ``spec.encryptionAtRest.azureKeyVault.``
          ``tenantID``
        - Unique 36-hexadecimal character string that identifies the
          |azure| Active Directory tenant within your |azure|
          subscription. |azure| displays the tenant ID on the tenant
          properties page.

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
            azureEnvironment: "AZURE"
            clientID: "g54f9e2-89e3-40fd-8188-EXAMPLEID"
            enabled: true
            keyIdentifier: "https://EXAMPLEKeyVault.vault.azure.net/keys/EXAMPLEKey/d891821e3d364e9eb88fbd3d11807b86"
            keyVaultName: "EXAMPLEKeyVault"
            resourceGroupName: "ExampleRGName"
            secret: "EXAMPLESECRET"
            tenantID: "e8e4b6ba-ff32-4c88-a9af-EXAMPLEID"
      EOF