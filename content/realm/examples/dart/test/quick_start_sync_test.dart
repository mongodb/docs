import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';
import 'utils.dart';

part 'quick_start_sync_test.realm.dart';

@RealmModel()
class _Todo {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;
  bool isComplete = false;
  late String summary;
  @MapTo('owner_id')
  late String ownerId;
}

void main() async {
  test('Add query to subscription set', () async {
    const yourAppIdHere = 'flutter-flexible-luccm'; // :remove:
    // Add your App Services App ID
    const appId = yourAppIdHere;
    // :snippet-start: init-app
    final app = App(AppConfiguration(appId));
    // :snippet-end:
    // :snippet-start: log-in
    final loggedInUser = await app.logIn(Credentials.anonymous());
    // :snippet-end:

    expect(loggedInUser.state, UserState.loggedIn);

    // :snippet-start: open-sync-realm
    final config = Configuration.flexibleSync(loggedInUser, [Todo.schema]);
    final realm = Realm(
      config,
    );
    // :snippet-end:

    expect(realm.isClosed, false);

    // :snippet-start: add-sync-subscription
    // Check if the subscription already exists before adding
    final userTodoSub = realm.subscriptions.findByName('getUserTodos');
    if (userTodoSub == null) {
      realm.subscriptions.update((mutableSubscriptions) {
        // server-side rules ensure user only downloads their own Todos
        mutableSubscriptions.add(realm.all<Todo>(), name: 'getUserTodos');
      });
    }
    // :snippet-end:

    await realm.subscriptions.waitForSynchronization();

    await cleanUpRealm(realm);
  });
}
