.. code-block:: typescript

   export const LogIn = () => {
     // `logInWithAnonymous` logs in a user using an
     // anonymous Realm Credential.
     // `result` gives us access to the result of the
     // current operation. In this case, `logInWithAnonymous`.
     const {logInWithAnonymous, result} = useAuth();

     // Log in an anyonmous user on component render.
     // On successful login, this fallback component unmounts.
     useEffect(() => {
       logInWithAnonymous();
     }, [])

     return (
       <View >
         {!result.error && <Text>Please log in</Text>}
         <View>
           {result.pending && <ActivityIndicator />}
           {result.error && <ErrorComponent error={result.error} />}
         </View>
       </View>
     );
   };
