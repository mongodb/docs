.. code-block:: dart
   :caption: lib/realm/realm_services.dart

     Future<void> updateSubscriptions() async {
       realm.subscriptions.update((mutableSubscriptions) {
         mutableSubscriptions.clear();
         if (showAll) {
           mutableSubscriptions.add(realm.all<Item>(), name: queryAllName);
         } else {
           mutableSubscriptions.add(
               realm.query<Item>(r'owner_id == $0', [currentUser?.id]),
               name: queryMyItemsName);
         }
       });
       await realm.subscriptions.waitForSynchronization();
     }
