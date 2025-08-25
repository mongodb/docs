.. code-block:: typescript

   export const AppWithAuthHook = () => {
     return (
       <View>
         <AppProvider id={APP_ID}>
           <UserProvider fallback={LogIn}>
             <MyApp />
           </UserProvider>
         </AppProvider>
       </View>
     );
   };
