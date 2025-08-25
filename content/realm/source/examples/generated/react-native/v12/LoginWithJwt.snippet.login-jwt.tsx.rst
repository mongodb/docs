.. code-block:: typescript

   export const LogInWithJWT = () => {
     const {logInWithJWT, result} = useAuth();
     // Get the current anonymous user so we can call
     // an App Services Function later.
     const anonymousUser = useUser();

     const performJWTLogin = async () => {
       // Get a JWT from a provider. In this case, from
       // an App Services Function called "generateJWT".
       const token = (await anonymousUser.functions.generateJWT()) as string;

       logInWithJWT(token);
     };

     // Handle `result`...
   };
