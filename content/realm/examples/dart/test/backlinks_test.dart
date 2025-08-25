import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'schemas.dart';
import 'utils.dart';

part 'backlinks_test.realm.dart';

// :snippet-start: backlink-models
@RealmModel()
class _User {
  @PrimaryKey()
  late ObjectId id;

  late String username;
  // One-to-many relationship that the backlink is created for below.
  late List<_Task> tasks;
}

@RealmModel()
class _Task {
  @PrimaryKey()
  late ObjectId id;

  late String description;
  late bool isComplete;

  // Backlink field. Links back to the `tasks` property in the `_User` model.
  @Backlink(#tasks)
  late Iterable<_User> linkedUser;
}
// :snippet-end:

void main() {
  test('Query Inverse Backlinks', () async {
    final config = Configuration.local([User.schema, Task.schema]);
    final realm = Realm(config);

    final han = User(ObjectId(), 'han', tasks: [
      Task(ObjectId(), 'Pay Chewie back', false),
      Task(ObjectId(), 'Get a haircut', false)
    ]);
    realm.write(() => realm.add(han));
    final jarjar = User(ObjectId(), 'jarjar_binks', tasks: [
      Task(ObjectId(), 'Give Senate speech', false),
      Task(ObjectId(), 'Swimming lessons', false),
      Task(ObjectId(), 'Practice for open mic night', true)
    ]);
    realm.write(() => realm.add(jarjar));

    // :snippet-start: filter-backlinks-rql
    // Filter Tasks through the User's backlink property
    // using `@links.<ObjectType>.<PropertyName>` syntax
    final jarjarsIncompleteTasks = realm.query<Task>(
        "ALL @links.User.tasks.username == 'jarjar_binks' AND isComplete == false");

    final tasksForHan =
        realm.query<Task>("ALL @links.User.tasks.username == 'han'");
    // :snippet-end:

    expect(jarjarsIncompleteTasks.length, 2);
    expect(tasksForHan.length, 2);

    // :snippet-start: query-backlink-inverse-relationship
    // Tasks have an inverse relationship to Users
    final inCompleteTasks = realm.query<Task>("isComplete == false");

    // Find all Users who have an incomplete Task
    for (final task in inCompleteTasks) {
      final ownersWithIncompleteTasks = task.getBacklinks<User>('tasks');
      for (final user in ownersWithIncompleteTasks) {
        print("User ${user.username} has incomplete tasks.");
      }
    }
    // :snippet-end:
    expect(
        inCompleteTasks
            .any((element) => element.description == 'Get a haircut'),
        true);

    await cleanUpRealm(realm);
  });

  test('Query To-One Backlinks', () async {
    // Use to-one models from Schemas.dart
    final config = Configuration.local([Person.schema, Bike.schema]);
    final realm = Realm(config);

    final ownerId = ObjectId();
    final bikeId = ObjectId();
    realm.write(() {
      realm.add(Person(ObjectId(), 'JarJar', 'Binks'));

      Person owner = realm.add(Person(ownerId, 'Anakin', 'Skywalker'));

      realm.add(Bike(bikeId, 'Podracer', owner: owner));

      realm.add(Bike(ObjectId(), 'Speeder Bike', owner: owner));
    });

    // :snippet-start: query-backlink-to-one-relationship
    // Persons have a to-one relationship with Bikes
    final person = realm.query<Person>("firstName == 'Anakin'").first;

    // Find all Bikes owned by a Person named 'Anakin'
    final allBikes = person.getBacklinks<Bike>('owner');
    // :snippet-end:
    expect(allBikes.length, 2);
    expect(allBikes.any((element) => element.id == bikeId), true);
    expect(allBikes.any((element) => element.owner!.id == ownerId), true);
    await cleanUpRealm(realm);
  });

  test('Query To-Many Backlinks', () async {
    // Use to-many models from Schemas.dart
    final config = Configuration.local(
        [Scooter.schema, ScooterShop.schema, Person.schema]);
    final realm = Realm(config);

    final scooterId = ObjectId();
    final shopId = ObjectId();

    realm.write(() {
      Scooter roadHog = realm.add(Scooter(ObjectId(), 'Road Hog 9000'));
      Scooter scooterbug = realm.add(Scooter(scooterId, 'Scooterbug'));
      Scooter bigBen = realm.add(Scooter(ObjectId(), 'Big Ben'));

      realm.add(ScooterShop(ObjectId(), 'The Scoot Zone',
          scooters: [roadHog, bigBen, scooterbug]));

      realm.add(
          ScooterShop(ObjectId(), 'Scooterz', scooters: [scooterbug, bigBen]));

      realm.add(ScooterShop(shopId, 'Scoot n Shop', scooters: [roadHog]));
    });
    // :snippet-start: query-backlinks-to-many-relationship
    // Scooters have a to-many relationship with ScooterShops
    final scooters = realm.query<Scooter>("name == 'Scooterbug'").first;

    // Find all ScooterShops with a Scooter named 'Scooterbug'
    final shops = scooters.getBacklinks<ScooterShop>('scooters');

    // :snippet-end:
    expect(shops.length, 2);
    expect(scooters.id, scooterId);
    expect(shops.any((element) => element.id == shopId), false);
    await cleanUpRealm(realm);
  });
}
