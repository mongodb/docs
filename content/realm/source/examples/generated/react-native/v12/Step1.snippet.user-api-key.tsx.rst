.. code-block:: typescript

   const user = useUser();

   const createUserApiKey = async () => {
     const {_id, key, name, disabled} = await user?.apiKeys.create(apiKeyName);

     // ...Do something with API key like save it
     // or share it with external service that authenticates
     // on user's behalf.
   };
