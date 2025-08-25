.. code-block:: dart
   :emphasize-lines: 6-7, 20-27, 37-42, 6-7, 20-27, 37-42
   :caption: lib/realm/realm_services.dart

   class RealmServices with ChangeNotifier {
     static const String queryAllName = "getAllItemsSubscription";
     static const String queryMyItemsName = "getMyItemsSubscription";
     static const String queryMyHighPriorityItemsName =
         "getMyHighPriorityItemsSubscription";
     static const String queryMyHighOrNoPriorityItemsName =
         "getMyHighOrNoPriorityItemsSubscription";

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
         // Check if subscription previously exists on the realm
         final subscriptionDoesNotExists =
             realm.subscriptions.findByName(queryMyHighOrNoPriorityItemsName) ==
                 null;

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
                 r'owner_id == $0 AND priority IN {$1, $2, $3}',
                 [currentUser?.id, PriorityLevel.high, PriorityLevel.severe, null],
               ),
               name: queryMyHighPriorityItemsName);
         }
       });
       await realm.subscriptions.waitForSynchronization();
     }

     // ... other methods
   }
