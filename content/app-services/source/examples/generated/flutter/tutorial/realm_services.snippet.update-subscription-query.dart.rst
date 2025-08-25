.. code-block:: dart
   :emphasize-lines: 6-7, 21-28, 38-43
   :caption: lib/realm/realm_services.dart

   // ... imports

   class RealmServices with ChangeNotifier {
     static const String queryAllName = "getAllItemsSubscription";
     static const String queryMyItemsName = "getMyItemsSubscription";
     static const String queryMyHighPriorityItemsName =
         "getMyHighPriorityItemsSubscription";

     bool showAll = false;
     bool offlineModeOn = false;
     bool isWaiting = false;
     late Realm realm;
     User? currentUser;
     App app;

     RealmServices(this.app) {
       if (app.currentUser != null || currentUser != app.currentUser) {
         currentUser ??= app.currentUser;
         realm = Realm(Configuration.flexibleSync(currentUser!, [Item.schema]));
         showAll = (realm.subscriptions.findByName(queryAllName) != null);
         // Check if subscription previously exists on the realm
         final subscriptionDoesNotExists =
             (realm.subscriptions.findByName(queryMyHighPriorityItemsName) ==
                 null);

         if (realm.subscriptions.isEmpty || subscriptionDoesNotExists) {
           updateSubscriptions();
         }
       }
     }

     Future<void> updateSubscriptions() async {
       realm.subscriptions.update((mutableSubscriptions) {
         mutableSubscriptions.clear();
         if (showAll) {
           mutableSubscriptions.add(realm.all<Item>(), name: queryAllName);
         } else {
           mutableSubscriptions.add(
               realm.query<Item>(
                 r'owner_id == $0 AND priority <= $1',
                 [currentUser?.id, PriorityLevel.high],
               ),
               name: queryMyHighPriorityItemsName);
         }
       });
       await realm.subscriptions.waitForSynchronization();
     }

     // ... other methods
   }
