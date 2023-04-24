.. tip:: Attached Service Account

   If you are using an `attached service account
   <https://cloud.google.com/iam/docs/impersonating-service-accounts#binding-to-resources>`__,
   you can allow it to automatically authenticate it to your GCP KMS. 

   To automatically authenticate, assign an empty map instead of one
   that contains your GCP credentials, as shown in the following code:

   .. code-block:: java

      String kmsProvider = "gcp";
      Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
      Map<String, Object> providerDetails = new HashMap<>();
      kmsProviders.put(kmsProvider, providerDetails);

   Proceed to the next step in the guide after adding this code.