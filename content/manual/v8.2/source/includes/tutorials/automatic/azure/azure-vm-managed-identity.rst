.. tip:: Azure Virtual Machine Managed Identities

         If your client runs on an Azure Virtual Machine (VM), you can allow the
         VM to use its Managed Identity to authenticate to your key vault.

         To allow the Azure VM to automatically provide your credentials,
         assign an empty map instead of one that contains your Azure
         credentials as shown in the following code:

         .. code-block:: java

             String kmsProvider = "azure";
             Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
             Map<String, Object> providerDetails = new HashMap<>();
             kmsProviders.put(kmsProvider, providerDetails);
