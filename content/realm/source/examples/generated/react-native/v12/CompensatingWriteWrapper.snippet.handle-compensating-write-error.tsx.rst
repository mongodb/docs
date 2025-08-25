.. code-block:: typescript
   :emphasize-lines: 30

   export const CompensatingWriteErrorHandling = () => {
     const [error, setError] = useState<CompensatingWriteError | undefined>(
       undefined,
     );

     // Create a callback for sync error handling using CompensatingWriteError
     const errorCallback: ErrorCallback = (_session, error) => {
       if (error instanceof CompensatingWriteError) {
         // Handle the compensating write error as needed
         console.debug({
           code: error.code,
           name: error.name,
           category: error.category,
           message: error.message,
           url: error.logUrl,
           writes: error.writes,
         });

         setError(error);
       }
     };

     return (
       <AppProvider id={APP_ID}>
         <UserProvider fallback={LogIn}>
           <RealmProvider
             schema={[Person, Turtle]}
             sync={{
               flexible: true,
               onError: errorCallback, 
             }}>
             <CompensatingWriteErrorHandler error={error} />
           </RealmProvider>
         </UserProvider>
       </AppProvider>
     );
   };
