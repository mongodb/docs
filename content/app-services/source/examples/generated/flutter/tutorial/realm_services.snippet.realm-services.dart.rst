.. code-block:: dart
   :caption: lib/realm/realm_services.dart
   :emphasize-lines: 18-20, 31-33, 41-43, 63-68

   // ... imports

   class RealmServices with ChangeNotifier {
     static const String queryAllName = "getAllItemsSubscription";
     static const String queryMyItemsName = "getMyItemsSubscription";

     bool showAll = false;
     bool offlineModeOn = false;
     bool isWaiting = false;
     late Realm realm;
     User? currentUser;
     App app;

     // ... RealmServices initializer and updateSubscriptions(),
     //     sessionSwitch() and switchSubscription() methods


     void createItem(String summary, bool isComplete, int? priority) {
       final newItem = Item(ObjectId(), summary, currentUser!.id,
           isComplete: isComplete, priority: priority);
       realm.write<Item>(() => realm.add<Item>(newItem));
       notifyListeners();
     }

     void deleteItem(Item item) {
       realm.write(() => realm.delete(item));
       notifyListeners();
     }

     Future<void> updateItem(Item item,
         {String? summary,
         bool? isComplete,
         int? priority}) async {
       realm.write(() {
         if (summary != null) {
           item.summary = summary;
         }
         if (isComplete != null) {
           item.isComplete = isComplete;
         }
         if (priority != null) {
           item.priority = priority;
         }
       });
       notifyListeners();
     }

     Future<void> close() async {
       if (currentUser != null) {
         await currentUser?.logOut();
         currentUser = null;
       }
       realm.close();
     }

     @override
     void dispose() {
       realm.close();
       super.dispose();
     }
   }

   abstract class PriorityLevel {
     static int severe = 0;
     static int high = 1;
     static int medium = 2;
     static int low = 3;
   }

