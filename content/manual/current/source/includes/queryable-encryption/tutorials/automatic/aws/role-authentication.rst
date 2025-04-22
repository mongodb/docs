.. important:: Reminder: Authenticate with IAM Roles in Production

   To use an {+aws-iam-abbr+} role instead of an {+aws-iam-abbr+} user 
   to authenticate your application,
   specify an empty object for your credentials in your KMS provider
   object. This instructs the driver to automatically retrieve the credentials
   from the environment:

   .. tabs-drivers::

      .. tab::
         :tabid: python   
         
         .. code-block:: python

            kms_provider_credentials = {
              "aws": { }
            }

      .. tab::
         :tabid: java-sync            

         .. code-block:: java                                              
            
            kmsProviderCredentials.put("aws", new HashMap<>());
            
      .. tab:: 
         :tabid: nodejs

         .. code-block:: javascript

            kmsProviders = {
              aws: { }
            };
            
      .. tab::
         :tabid: shell

         .. code-block:: javascript                        

            kmsProviders = {
              aws: { }
            }; 

      .. tab::
         :tabid: csharp

         .. code-block:: csharp

            kmsProviderCredentials.Add("aws", new Dictionary<string, object>);  

      .. tab::
         :tabid: go

         .. code-block:: go

            kmsProviderCredentials := map[string]map[string]interface{}{
              "aws": { },
            }

   You cannot automatically retrieve credentials if you are using a named KMS provider.
