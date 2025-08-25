.. code-block:: typescript
   :emphasize-lines: 4-6, 16, 18

   export const AlwaysWait = () => {
     const realm = useRealm();
     // Get all local birds that have not been seen yet.
     const unSeenBirds = useQuery(Bird, collection =>
       collection.filtered('haveSeen == false'),
     );
     const [unSeenBirdsSubscription, setUnseenBirdsSubscription] =
       useState<Subscription | null>();

     useEffect(() => {
       const createSubscription = async () => {
         // Add subscription with timeout.
         // If timeout expires before sync is completed, currently-downloaded
         // objects are returned and sync download continues in the background.
         await unSeenBirds.subscribe({
           behavior: WaitForSync.Always, 
           name: 'Always wait',
           timeout: 500, 
         });
       };

       createSubscription().catch(console.error);

       // Get the subscription...
       const subscription = realm.subscriptions.findByName('Always wait');

       // ... and set it to a stateful variable or manage it in `useEffect`.
       setUnseenBirdsSubscription(subscription);
     }, []);

     return (
       // Work with the subscribed results list or modify the subscription...
       <></>
     );
   };
