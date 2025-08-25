.. code-block:: typescript

   export const LinkIdentities = () => {
     return (
       <AppProvider id={APP_ID}>
         <UserProvider fallback={LogIn}>
           <RegisterUser />
         </UserProvider>
       </AppProvider>
     );
   };

   // Log in an anonymous user. This component only mounts
   // if there is no authenticated user.
   const LogIn = () => {
     const {logInWithAnonymous} = useAuth();

     return (
       <View>
         <Text>No one is logged in yet.</Text>
         <Pressable
           onPress={logInWithAnonymous}>
           <Text style={styles.buttonText}>Log in</Text>
         </Pressable>
       </View>
     );
   };
