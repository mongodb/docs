.. code-block:: typescript

   export const WaitFirstTime = () => {
     const realm = useRealm();
     const [birdName, setBirdName] = useState('Change me!');

     // Get local birds that have been marked as "haveSeen".
     const seenBirds = useQuery(Bird).filtered('haveSeen == true');
     const [seenBirdsSubscription, setSeenBirdsSubscription] =
       useState<Subscription | null>();

     useEffect(() => {
       const createSubscription = async () => {
         // Only wait for sync to finish on the initial sync.
         await seenBirds.subscribe({
           behavior: WaitForSync.FirstTime,
           name: 'First time sync only',
         });

         // Get the subscription...
         const subscription = realm.subscriptions.findByName(
           'First time sync only',
         );

         // ... and set it to a stateful variable or manage it in `useEffect`.
         setSeenBirdsSubscription(subscription);
       };

       createSubscription().catch(console.error);
     }, []);

     // ...work with the subscribed results list or modify the subscription.

   };
