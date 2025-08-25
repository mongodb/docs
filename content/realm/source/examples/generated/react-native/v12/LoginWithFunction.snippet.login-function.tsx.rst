.. code-block:: typescript

   export const LogInWithFunction = () => {
     const {logInWithFunction, result} = useAuth();

     const performFunctionLogin = async (email: string, password: string) => {
       // Pass arbitrary information to the Atlas function configured
       // for your App's Custom Function provider.
       logInWithFunction({email, password});
     };

     // Handle `result`...
   };
