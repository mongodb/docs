.. code-block:: typescript

   const loginApiKeyUser = async (apiKey: ApiKey) => {
     try {
       logInWithApiKey(apiKey!.key);
     } catch (error) {
       console.log(error);
     }
   };
