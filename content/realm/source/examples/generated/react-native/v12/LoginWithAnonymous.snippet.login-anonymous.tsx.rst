.. code-block:: typescript

   export const LogInWithAnonymous = () => {
     const {logInWithAnonymous, result} = useAuth();

     const performAnonymousLogin = logInWithAnonymous;

     // Handle `result`...
   };
